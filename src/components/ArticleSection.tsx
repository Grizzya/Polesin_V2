import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { useLocale } from 'next-intl';

export default async function ArticleSection() {
  const locale = useLocale();

  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const getJudul = (item: any) => locale === "id" ? item.title_id : item.title_en;
  const getKonten = (item: any) => locale === "id" ? item.excerpt_id : item.excerpt_en;

  const formatTanggal = (date: Date) =>
    new Date(date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric", month: "long", year: "numeric",
    });

  const placeholderImg = "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="bg-white">
      <section
        className="rounded-t-[50px] bg-white px-6 py-16 md:px-16"
        aria-labelledby="article-section-heading"
      >
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-[#0D4884]">
            {locale === 'id' ? 'Artikel Kami' : 'Our Articles'}
          </p>

          <h2
            id="article-section-heading"
            className="text-3xl font-extrabold text-gray-900 md:text-4xl"
          >
            {locale === 'id' ? 'Artikel & Wawasan Terbaru' : 'Latest Articles & Insights'}
          </h2>
        </div>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              image={article.image || placeholderImg}
              date={formatTanggal(article.createdAt)}
              title={getJudul(article)}
              description={getKonten(article)}
              slug={article.slug}
              locale={locale}
            />
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 flex justify-center md:justify-end">
          <Link
            href={`/${locale}/articles`}
            className="rounded-xl bg-[#0D4884] px-7 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#0D4884]/90 hover:shadow-md"
          >
            {locale === 'id' ? 'Lihat Semua Artikel' : 'View All Articles'}
          </Link>
        </div>
      </section>
    </div>
  );
}

type ArticleCardProps = {
  image: string;
  date: string;
  title: string;
  description: string;
  slug: string;
  locale: string;
};

function ArticleCard({
  image,
  date,
  title,
  description,
  slug,
  locale
}: ArticleCardProps) {
  return (
    <Link href={`/${locale}/articles/${slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl bg-white transition-all duration-500 group-hover:scale-[1.02] shadow-md group-hover:shadow-2xl border border-gray-100">
        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="mb-2 block text-[11px] font-extrabold uppercase tracking-widest text-[#0D4884]">
            {date}
          </p>

          <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-[#0D4084] md:text-lg">
            {title}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
            {description}
          </p>

          {/* Read More */}
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#0D4884]">
            <span>{locale === 'id' ? 'Baca Selengkapnya' : 'Read More'}</span>

            <svg
              className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}