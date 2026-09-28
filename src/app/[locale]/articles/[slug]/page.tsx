import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import sanitizeHtml from 'sanitize-html';

export const revalidate = 60; 

const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.452-.885-.77-1.482-1.72-1.655-2.018-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a1.183 1.183 0 0 0-.86.4 3.613 3.613 0 0 0-1.124 2.684c0 1.56 1.149 3.067 1.309 3.265.159.198 2.228 3.398 5.4 4.707 3.172 1.31 3.172.873 3.746.823.574-.05 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z";

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
  const tanggalBikin = new Date(article.createdAt).toLocaleDateString(
    locale === 'id' ? 'id-ID' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans">
      <article className="bg-white pt-28 lg:pt-40 pb-16 lg:pb-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">

          {/* HEADER */}
          <header className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-gray-400 text-[15px] leading-relaxed px-4 md:px-12">
              {locale === 'id' ? 'Dipublikasikan pada ' : 'Published on '}
              <time dateTime={new Date(article.createdAt).toISOString()}>{tanggalBikin}</time>
            </p>
          </header>

          {/* MAIN IMAGE */}
          {article.image && (
            <div className="w-full h-[250px] md:h-[450px] lg:h-[550px] rounded-xl overflow-hidden mb-16 shadow-sm relative">
              <Image 
                src={article.image} 
                alt={title || ''}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                className="object-cover" 
              />
            </div>
          )}

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Konten artikel */}
            <div className="lg:col-span-8">
              <div
                className="article-content text-gray-700 text-justify
                           [&>p]:mb-6 [&>p]:leading-relaxed
                           [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-gray-900
                           [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-gray-900
                           [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2
                           [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
                           [&>a]:text-[#0D4884] [&>a]:underline hover:[&>a]:text-[#0D4884]/80
                           [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:my-6
                           [&>img]:rounded-xl [&>img]:my-8 [&>img]:shadow-md"
                dangerouslySetInnerHTML={{ 
                  __html: sanitizeHtml(content || '', {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'span', 'figure', 'figcaption', 'iframe', 'video']),
                    allowedAttributes: {
                      ...sanitizeHtml.defaults.allowedAttributes,
                      '*': ['class', 'style', 'id', 'src', 'alt', 'width', 'height', 'target', 'rel']
                    },
                    allowedIframeHostnames: ['www.youtube.com']
                  }) 
                }}
              />
            </div>        

            {/* CTA sticky */}
            <div className="lg:col-span-4 self-start sticky top-28">
              <div className="bg-[#0D4884] rounded-2xl p-7 flex flex-col gap-5">

                <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 w-fit">
                  <svg viewBox="0 0 24 24" fill="#25d366" className="w-3 h-3" aria-hidden="true">
                    <path d={WA_PATH} />
                  </svg>
                  <span className="text-xs font-medium text-white">
                    {locale === 'id' ? 'Respon Cepat' : 'Fast Response'}
                  </span>
                </div>

                <div>
                  <h2 className="text-white text-[22px] font-semibold leading-snug">
                    {locale === 'id' ? 'Butuh Jasa Poles Lantai?' : 'Need Floor Polishing Service?'}
                  </h2>
                  <p className="mt-2 text-sm text-gray-200 leading-relaxed">
                    {locale === 'id'
                     ? 'Tim ahli kami siap mengembalikan kilau lantai Anda — marmer, teraso, granit, & lainnya.'
                     : 'Our expert team is ready to restore your floor\'s shine — marble, terrazzo, granite, & more.'}
                  </p>
                </div>

                <div className="h-px bg-white/15" />

                <a href="https://wa.me/6282322884855" target="_blank" rel="noopener noreferrer"
                  aria-label="Contact via WhatsApp"
                  className="bg-[#1a1a1a] hover:bg-black text-[#ffffff] rounded-xl px-5 py-3.5 flex items-center justify-between transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" fill="#25d366" className="w-7 h-7 shrink-0" aria-hidden="true">
                      <path d={WA_PATH} />
                    </svg>
                    <div>
                      <span className="block text-[11px] text-[#ffffff] leading-none mb-1">
                        {locale === 'id' ? 'Hubungi via' : 'Chat via'}
                      </span>
                      <span className="block text-sm font-semibold leading-none">WhatsApp</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" stroke="white" strokeWidth="2" fill="none" className="w-4 h-4 opacity-50" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>

              </div>
            </div>

          </div>
        </div>
      </article>
    </div>
  );
}
