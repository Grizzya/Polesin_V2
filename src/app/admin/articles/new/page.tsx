'use client';
import { useActionState } from 'react';
import { createArticleAction } from './actions';
import ArticleEditor from '../../components/ArticleEditor';

export default function NewArticlePage() {
  const [state, formAction] = useActionState(createArticleAction, null);
  return <ArticleEditor formAction={formAction} state={state} />;
}
