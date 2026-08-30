import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditArticleForm from './EditArticleForm';

export default async function EditArticlePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  const article = await prisma.article.findUnique({ where: { id } });
  
  if (!article) {
    notFound();
  }

  return <EditArticleForm article={article} />;
}
