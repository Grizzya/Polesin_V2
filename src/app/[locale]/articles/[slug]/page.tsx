import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

export const revalidate = 60; // ISR: regenerate every 60 seconds

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    select: { slug: true }
  });

  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const article of articles) {
      params.push({ locale, slug: article.slug });
    }
  }

  return params;
}

// Setup dynamic metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}): Promise<Metadata> {
  const { locale, slug } = await params;
  
  const article = await prisma.article.findUnique({
    where: { slug }
  });

  if (!article || article.status !== 'published') {
    return { title: 'Not Found' };
  }

  const title = locale === 'id' ? (article.metaTitle_id || article.title_id) : (article.metaTitle_en || article.title_en);
  const description = locale === 'id' ? (article.metaDescription_id || article.excerpt_id) : (article.metaDescription_en || article.excerpt_en);

  const pathPrefix = locale === 'en' ? '' : `/${locale}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description || undefined,
      images: article.image ? [article.image] : [],
      type: 'article',
    },
    alternates: {
      canonical: `${pathPrefix}/articles/${slug}`,
      languages: {
        en: `/articles/${slug}`,
        id: `/id/articles/${slug}`,
        'x-default': `/articles/${slug}`
      }
    }
  };
}

export default async function ArticleDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article || article.status !== 'published') {
    notFound();
  }

  const title = locale === 'id' ? article.title_id : article.title_en;
  const content = locale === 'id' ? article.content_id : article.content_en;

  return (
    <article className="container mx-auto px-4 pb-12 pt-32 md:pb-16 md:pt-40 max-w-4xl">
      <Link 
        href={`/${locale}/articles`}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors font-medium"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {locale === 'id' ? 'Kembali ke Daftar Artikel' : 'Back to Articles'}
      </Link>

      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {title}
        </h1>
        <div className="text-gray-500 flex items-center justify-center space-x-2">
          <time dateTime={new Date(article.createdAt).toISOString()}>
            {new Date(article.createdAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </header>

      {article.image && (
        <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <Image 
            src={article.image} 
            alt={title} 
            fill 
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* 
        Using basic descendant selectors to ensure rich text is readable 
        if @tailwindcss/typography is not installed.
      */}
      <div 
        className="text-lg md:text-xl leading-relaxed text-gray-800 
                   [&>p]:mb-6 [&>p]:leading-relaxed
                   [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-gray-900
                   [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-gray-900
                   [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2
                   [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
                   [&>a]:text-blue-600 [&>a]:underline hover:[&>a]:text-blue-800
                   [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:my-6
                   [&>img]:rounded-xl [&>img]:my-8 [&>img]:shadow-md"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
