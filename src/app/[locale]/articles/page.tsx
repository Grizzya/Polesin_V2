import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;
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

export default async function ArticlesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams.page) || 1;
  
  const itemsPerPage = 6;
  const skip = (currentPage - 1) * itemsPerPage;

  const whereCondition: any = {
    status: 'published',
  };

  const articles = await prisma.article.findMany({
    where: whereCondition,
    skip,
    take: itemsPerPage,
    orderBy: { createdAt: "desc" },
  });

  const totalItems = await prisma.article.count({ where: whereCondition });
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8 font-sans">
        <main className="max-w-[1440px] w-full mx-auto py-20 text-center text-gray-500 flex-grow">
          <p>{locale === 'id' ? "Belum ada artikel yang dipublikasikan." : "No articles published yet."}</p>
        </main>
      </div>
    );
  }

  const artikelUtama = articles[0];
  const artikelSisa = articles.slice(1);
  
  // Membagi 5 artikel sisa: 3 di kolom kiri, 2 di kolom kanan (Top News)
  const artikelListKiri = artikelSisa.slice(0, 3);
  const artikelTopNewsKanan = artikelSisa.slice(3, 5);

  const getJudul = (item: any) => locale === "id" ? item.title_id : item.title_en;
  const getKonten = (item: any) => locale === "id" ? item.excerpt_id : item.excerpt_en;

  const formatTanggal = (date: Date) =>
    new Date(date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric", month: "long", year: "numeric",
    });

  const placeholderImg = "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="min-h-screen bg-gray-50 text-black pb-16 pt-32 lg:pt-40 font-sans">
      <main className="max-w-[1440px] w-full mx-auto px-4 md:px-10 py-12 flex-grow space-y-12">

        {/* HEADER */}
        <div className="space-y-1">
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded">
            {locale === 'id' ? 'Berita & Wawasan' : 'News & Insights'}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 max-w-2xl leading-tight">
            {locale === 'id' 
              ? 'Pembaruan Terbaru & Wawasan dari Kami'
              : 'Latest Updates & Insights from Us'}
          </h1>
        </div>

        {/* SUBHEADER */}
        <div className="border-b border-gray-200 pb-2 flex justify-between items-center">
          <span className="text-sm font-bold text-gray-800 border-b-2 border-black pb-2">
            {locale === 'id' ? 'Artikel Terbaru' : 'Latest Articles'} {currentPage > 1 && `– Page ${currentPage}`}
          </span>
        </div>

        {/* HERO ARTICLE */}
        {currentPage === 1 && (
          <Link href={`/${locale}/articles/${artikelUtama.slug}`} className="group block relative rounded-xl overflow-hidden shadow-lg border">
            <div className="relative h-[550px] w-full bg-gray-900">
              <Image 
                src={artikelUtama.image || placeholderImg} 
                alt={getJudul(artikelUtama)}
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 space-y-4 max-w-3xl">
                <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug drop-shadow-sm">
                  {getJudul(artikelUtama)}
                </h2>
                <p className="text-gray-200 text-sm md:text-base line-clamp-2 leading-relaxed opacity-90 font-light">
                  {getKonten(artikelUtama)}
                </p>
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold text-xs px-5 py-3 rounded hover:bg-blue-700 transition-colors mt-2 shadow-md">
                  {locale === 'id' ? 'Baca Selengkapnya' : 'Read Full Article'} &rarr;
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">

          <div className={`${currentPage === 1 ? "lg:col-span-2" : "lg:col-span-3"} space-y-6 divide-y divide-gray-100`}>
            {(currentPage === 1 ? artikelListKiri : articles).map((item, idx) => (
              <Link key={item.id} href={`/${locale}/articles/${item.slug}`}
                className={`group flex flex-col-reverse md:flex-row gap-8 rounded-xl p-4 transition-all duration-300 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-sm ${idx > 0 ? "mt-6 pt-6" : ""}`}
              >
                <div className="flex-1 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <time dateTime={new Date(item.createdAt).toISOString()}>{formatTanggal(item.createdAt)}</time>
                      <span className="text-gray-200" aria-hidden="true">|</span>
                      <span className="text-blue-600 font-semibold uppercase text-[10px]">
                        {locale === 'id' ? 'Artikel' : 'Article'}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {getJudul(item)}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed font-light">{getKonten(item)}</p>
                  </div>
                </div>
                <div className="w-full md:w-72 h-48 relative flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden border shadow-sm">
                  <Image 
                    src={item.image || placeholderImg} 
                    alt={getJudul(item)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    fill 
                  />
                </div>
              </Link>
            ))}
          </div>

          {currentPage === 1 && (
            <aside className="space-y-6" aria-label="Top News">
              {artikelTopNewsKanan.map((item) => (
                <Link key={item.id} href={`/${locale}/articles/${item.slug}`}
                  className="group block space-y-4 rounded-xl p-4 transition-all duration-300 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-sm">
                  <div className="w-full h-64 sm:h-[250px] relative bg-gray-100 rounded-xl overflow-hidden border shadow-sm">
                    <Image 
                      src={item.image || placeholderImg} 
                      alt={getJudul(item)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      fill 
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider block">
                      {locale === 'id' ? 'Pilihan Editor' : 'Editor Choice'}
                    </span>
                    <h2 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {getJudul(item)}
                    </h2>
                    <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed font-light">{getKonten(item)}</p>
                  </div>
                </Link>
              ))}
            </aside>
          )}

        </div>

        {/* PAGINATION */}
        <nav className="border-t border-gray-200 pt-8 flex items-center justify-between" aria-label="Pagination">
          <p className="text-xs text-gray-400">
            {locale === 'id' ? 'Halaman' : 'Page'} <strong className="text-black">{currentPage}</strong> {locale === 'id' ? 'dari' : 'of'} <strong className="text-black">{totalPages}</strong>
          </p>
          <div className="flex gap-2">
            {currentPage > 1 ? (
              <Link href={`?page=${currentPage - 1}`} className="px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm">
                &larr; {locale === 'id' ? 'Sebelumnya' : 'Previous'}
              </Link>
            ) : (
              <button disabled className="px-4 py-2 text-xs font-bold text-gray-300 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">&larr; {locale === 'id' ? 'Sebelumnya' : 'Previous'}</button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link key={page} href={`?page=${page}`} aria-current={currentPage === page ? "page" : undefined}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition-all ${currentPage === page ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}>
                {page}
              </Link>
            ))}
            {currentPage < totalPages ? (
              <Link href={`?page=${currentPage + 1}`} className="px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm">
                {locale === 'id' ? 'Selanjutnya' : 'Next'} &rarr;
              </Link>
            ) : (
              <button disabled className="px-4 py-2 text-xs font-bold text-gray-300 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">{locale === 'id' ? 'Selanjutnya' : 'Next'} &rarr;</button>
            )}
          </div>
        </nav>

      </main>
    </div>
  );
}
