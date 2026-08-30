'use server'

import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin } from '@/lib/auth-guard';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function getUniqueSlug(baseSlug: string, currentArticleId: string) {
  let uniqueSlug = baseSlug;
  let counter = 2;
  
  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug: uniqueSlug } });
    if (!existing || existing.id === currentArticleId) break;
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
}

export async function editArticleAction(prevState: any, formData: FormData) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return { error: 'Unauthorized. Sesi telah berakhir atau tidak valid.' };
  }

  const id = formData.get('id') as string;
  const title_en = formData.get('title_en') as string;
  const title_id = formData.get('title_id') as string;
  const excerpt_en = formData.get('excerpt_en') as string;
  const excerpt_id = formData.get('excerpt_id') as string;
  const content_en = formData.get('content_en') as string;
  const content_id = formData.get('content_id') as string;
  const metaTitle_en = formData.get('metaTitle_en') as string;
  const metaTitle_id = formData.get('metaTitle_id') as string;
  const metaDescription_en = formData.get('metaDescription_en') as string;
  const metaDescription_id = formData.get('metaDescription_id') as string;
  const focusKeyword = formData.get('focusKeyword') as string;
  const status = formData.get('status') as string || 'draft';
  const imageFile = formData.get('image') as File | null;

  if (!id || !title_en || !title_id || !content_en || !content_id) {
    return { error: 'Field utama (Judul & Konten) wajib diisi.' };
  }

  try {
    const existingArticle = await prisma.article.findUnique({ where: { id } });
    if (!existingArticle) {
      return { error: 'Artikel tidak ditemukan.' };
    }

    let slug = existingArticle.slug;
    if (existingArticle.title_en !== title_en) {
      const baseSlug = generateSlug(title_en);
      slug = await getUniqueSlug(baseSlug, id);
    }

    let imageUrl = existingArticle.image;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const newImageUrl = await uploadImage(buffer);
      
      // Cleanup old image
      if (existingArticle.image) {
        await deleteImage(existingArticle.image);
      }
      imageUrl = newImageUrl;
    }

    await prisma.article.update({
      where: { id },
      data: {
        title_en,
        title_id,
        slug,
        excerpt_en,
        excerpt_id,
        content_en,
        content_id,
        metaTitle_en,
        metaTitle_id,
        metaDescription_en,
        metaDescription_id,
        focusKeyword,
        status,
        image: imageUrl,
      }
    });

    await prisma.auditLog.create({
      data: {
        action: 'edit_article',
        target: 'Article',
        targetId: id,
        adminId: admin.id,
        description: `Edited article: ${title_en}`
      }
    });

  } catch (error: any) {
    console.error('Failed to update article:', error);
    return { error: error.message || 'Terjadi kesalahan saat mengupdate artikel.' };
  }

  revalidatePath('/admin/articles');
  revalidatePath('/admin/dashboard');
  redirect('/admin/articles');
}
