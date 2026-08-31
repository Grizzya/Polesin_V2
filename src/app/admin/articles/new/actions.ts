'use server'

import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin } from '@/lib/auth-guard';
import { uploadImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function getUniqueSlug(baseSlug: string) {
  let uniqueSlug = baseSlug;
  let counter = 2;
  
  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug: uniqueSlug } });
    if (!existing) break;
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
}

export async function createArticleAction(prevState: any, formData: FormData) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return { error: 'Unauthorized. Sesi telah berakhir atau tidak valid.' };
  }

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

  if (!title_en || !title_id || !content_en || !content_id) {
    return { error: 'Field utama (Judul & Konten) wajib diisi untuk kedua bahasa.' };
  }

  try {
    const baseSlug = generateSlug(title_en);
    const slug = await getUniqueSlug(baseSlug);

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadImage(buffer);
    }

    const newArticle = await prisma.article.create({
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
        authorId: admin.id,
      }
    });

    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'Unknown';

    await prisma.auditLog.create({
      data: {
        action: 'create_article',
        target: 'Article',
        targetId: newArticle.id,
        adminId: admin.id,
        description: `Created new article: ${title_en} (${slug})`,
        ipAddress
      }
    });

  } catch (error: any) {
    console.error('Failed to create article:', error);
    return { error: error.message || 'Terjadi kesalahan saat menyimpan artikel.' };
  }

  revalidatePath('/admin/articles');
  revalidatePath('/admin/dashboard');
  redirect('/admin/articles');
}
