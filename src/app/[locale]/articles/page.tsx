import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 60; // ISR: regenerate every 60 seconds

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  const title = locale === 'id' ? 'Artikel Terbaru' : 'Latest Articles';
  const description = locale === 'id' 
    ? 'Baca artikel terbaru seputar layanan dan informasi dari kami.'
    : 'Read the latest articles about our services and information.';

  const pathPrefix = locale === 'en' ? '' : `/${locale}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `${pathPrefix}/articles`,
      languages: {
        en: '/articles',
        id: '/id/articles',
        'x-default': '/articles'
      }
    }
  };
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
  });

  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  const gridArticles = articles.slice(4);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const placeholderImg = "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[1440px] w-full mx-auto space-y-24">
        
        {/* --- SECTION 1: Our Insightful Blog --- */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight">
              {locale === 'id' ? (
                <>Artikel Terbaru & Karya Kami</>
              ) : (
                <>Latest Articles & Our Work</>
              )}
            </h2>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Featured Article (Left - takes up 7 cols) */}
              {featuredArticle && (
                <Link href={`/${locale}/articles/${featuredArticle.slug}`} className="lg:col-span-7 relative rounded-2xl overflow-hidden group cursor-pointer h-[400px] block shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <Image 
                    src={featuredArticle.image || placeholderImg} 
                    alt={locale === 'id' ? featuredArticle.title_id : featuredArticle.title_en} 
                    fill
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                      {locale === 'id' ? featuredArticle.title_id : featuredArticle.title_en}
                    </h3>
                    <div className="flex items-center text-gray-300 text-sm mb-3 gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {formatDate(featuredArticle.createdAt)}
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {locale === 'id' ? featuredArticle.excerpt_id : featuredArticle.excerpt_en}
                    </p>
                  </div>
                </Link>
              )}

              {/* Side Articles (Right - takes up 5 cols) */}
              {sideArticles.length > 0 && (
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {sideArticles.map((article) => (
                    <Link href={`/${locale}/articles/${article.slug}`} key={article.id} className="bg-white rounded-2xl p-4 flex gap-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-100 group">
                      <div className="w-32 h-24 relative flex-shrink-0 overflow-hidden rounded-xl">
                        <Image 
                          src={article.image || placeholderImg} 
                          alt={locale === 'id' ? article.title_id : article.title_en} 
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {locale === 'id' ? article.title_id : article.title_en}
                        </h4>
                        <div className="flex items-center text-gray-500 text-xs mb-2 gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {formatDate(article.createdAt)}
                        </div>
                        <span className="text-sm font-semibold text-slate-800 flex items-center gap-1 group-hover:text-blue-600">
                          {locale === 'id' ? 'Baca Selengkapnya' : 'Read More'} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              {locale === 'id' ? 'Belum ada artikel yang dipublikasikan.' : 'No published articles yet.'}
            </p>
          )}
        </section>

        {/* --- SECTION 2: Explore Our Latest Articles --- */}
        {gridArticles.length > 0 && (
          <section>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-4">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {locale === 'id' ? (
                  <>Jelajahi Artikel <span className="border-b-4 border-teal-600/60 pb-1">Terbaru</span></>
                ) : (
                  <>Explore Our Latest <span className="border-b-4 border-teal-600/60 pb-1">Articles</span></>
                )}
              </h2>
              <p className="text-gray-500 max-w-lg lg:text-right text-sm">
                {locale === 'id' 
                  ? 'Temukan berbagai wawasan, panduan, dan pembaruan terbaru seputar layanan kami untuk mendukung kesuksesan Anda.' 
                  : 'Discover various insights, guides, and the latest updates about our services to support your success.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map((article) => (
                <Link href={`/${locale}/articles/${article.slug}`} key={article.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col group border border-gray-100">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image 
                      src={article.image || placeholderImg} 
                      alt={locale === 'id' ? article.title_id : article.title_en} 
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="font-bold text-slate-900 text-lg mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {locale === 'id' ? article.title_id : article.title_en}
                    </h4>
                    <div className="flex items-center text-gray-500 text-sm mb-4 gap-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {formatDate(article.createdAt)}
                    </div>
                    <div className="mt-auto pt-2">
                      <span className="text-sm font-semibold text-slate-800 flex items-center gap-1 group-hover:text-blue-600">
                        {locale === 'id' ? 'Baca Selengkapnya' : 'Read More'} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
