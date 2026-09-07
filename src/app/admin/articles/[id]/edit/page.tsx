import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import EditArticleForm from './EditArticleForm';
import { getAuthenticatedAdmin } from '@/lib/auth-guard';

export const dynamic = 'force-dynamic';

export default async function EditArticlePage(props: { params: Promise<{ id: string }> }) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const params = await props.params;
  const id = params.id;
  
  const article = await prisma.article.findUnique({ where: { id } });
  
  if (!article) {
    notFound();
  }

  return <EditArticleForm article={article} />;
}
