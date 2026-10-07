import AboutUs from '@/components/AboutUs';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import {getTranslations} from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const { locale } = await params;
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
      canonical: locale === 'en' ? '/about-us' : `/${locale}/about-us`,
      languages: {
        en: '/about-us',
        id: '/id/about-us',
        'x-default': '/about-us'
      }
    }
  };
}

export default function AboutUsPage() {
  return (
    <>
      <ScrollAnimationWrapper />
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
