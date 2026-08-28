import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  const ogLocale = locale === 'id' ? 'id_ID' : 'en_US';

  return {
    title: t('gallery.title'),
    description: t('gallery.description'),
    openGraph: {
      title: t('gallery.title'),
      description: t('gallery.description'),
      locale: ogLocale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('gallery.title'),
      description: t('gallery.description')
    },
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: {
        en: '/en/gallery',
        id: '/id/gallery',
        'x-default': '/en/gallery'
      }
    }
  };
}

export default function GalleryPage() {
  return (
    <>
      <div className="gallery-banner">
        <div className="gallery-banner-content">
          <h1>GALLERY</h1>
          <div className="breadcrumb">
            <span>POLESIN</span>
          </div>
        </div>
      </div>

      <section className="gallery-section">
        <div className="container">
          <div className="gallery-grid">
            <div className="gallery-item item-1"><Image src="/images/Galerry/DSC00369.webp" alt="Gallery Image 1" width={400} height={400} /></div>
            <div className="gallery-item item-2"><Image src="/images/Galerry/DSC00440.webp" alt="Gallery Image 2" width={400} height={400} /></div>
            <div className="gallery-item item-3"><Image src="/images/Galerry/DSC00476.webp" alt="Gallery Image 3" width={400} height={400} /></div>
            <div className="gallery-item item-4"><Image src="/images/Galerry/DSC00386.webp" alt="Gallery Image 4" width={400} height={400} /></div>
            <div className="gallery-item item-5"><Image src="/images/Galerry/DSC00417.webp" alt="Gallery Image 5" width={400} height={400} /></div>
            <div className="gallery-item item-6"><Image src="/images/Galerry/DSC00425.webp" alt="Gallery Image 6" width={400} height={400} /></div>
            <div className="gallery-item item-7"><Image src="/images/Galerry/DSC00375.webp" alt="Gallery Image 7" width={400} height={400} /></div>
            <div className="gallery-item item-8"><Image src="/images/Galerry/DSC00434.webp" alt="Gallery Image 8" width={400} height={400} /></div>
            <div className="gallery-item item-9"><Image src="/images/Galerry/DSC00407.webp" alt="Gallery Image 9" width={400} height={400} /></div>
          </div>
        </div>
      </section>
    </>
  );
}
