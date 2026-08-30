'use client';
import { useActionState } from 'react';
import { editArticleAction } from './actions';
import ArticleEditor from '../../components/ArticleEditor';
import type { Article } from '@prisma/client';

export default function EditArticleForm({ article }: { article: Article }) {
  const [state, formAction] = useActionState(editArticleAction, null);
  return <ArticleEditor article={article} formAction={formAction} state={state} />;
}
