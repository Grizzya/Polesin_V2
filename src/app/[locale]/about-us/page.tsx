import AboutUs from '@/components/AboutUs';
import {getTranslations} from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  const ogLocale = locale === 'id' ? 'id_ID' : 'en_US';

  return {
    title: t('about.title'),
    description: t('about.description'),
    openGraph: {
      title: t('about.title'),
      description: t('about.description'),
      locale: ogLocale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('about.title'),
      description: t('about.description')
    },
    alternates: {
      canonical: `/${locale}/about-us`,
      languages: {
        en: '/en/about-us',
        id: '/id/about-us',
        'x-default': '/en/about-us'
      }
    }
  };
}

export default function AboutUsPage() {
  return (
    <>
      <div className="about-banner">
        <div className="about-banner-content">
          <h1>About Us</h1>
          <div className="breadcrumb">
            <span>POLESIN</span>
          </div>
        </div>
      </div>
      
      <AboutUs />
    </>
  );
}
