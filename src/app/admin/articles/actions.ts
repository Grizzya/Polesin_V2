'use server'

import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin } from '@/lib/auth-guard';
import { deleteImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteArticleAction(formData: FormData) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    throw new Error('Unauthorized');
  }

  const id = formData.get('id') as string;
  if (!id) {
    throw new Error('ID is required');
  }

  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) {
    throw new Error('Article not found');
  }

  // Delete from Cloudinary if image exists
  if (article.image) {
    await deleteImage(article.image);
  }

  // Delete from database
  await prisma.article.delete({ where: { id } });

  // Log audit
  await prisma.auditLog.create({
    data: {
      action: 'delete_article',
      target: 'Article',
      targetId: id,
      adminId: admin.id,
      description: `Deleted article: ${article.title_en}`
    }
  });

  revalidatePath('/admin/articles');
  revalidatePath('/admin/dashboard');
  redirect('/admin/articles');
}
