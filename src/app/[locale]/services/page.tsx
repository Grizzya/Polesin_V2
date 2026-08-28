import Services from '@/components/Services';
import {getTranslations} from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  const ogLocale = locale === 'id' ? 'id_ID' : 'en_US';

  return {
    title: t('services.title'),
    description: t('services.description'),
    openGraph: {
      title: t('services.title'),
      description: t('services.description'),
      locale: ogLocale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('services.title'),
      description: t('services.description')
    },
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        en: '/en/services',
        id: '/id/services',
        'x-default': '/en/services'
      }
    }
  };
}

export default function ServicesPage() {
  return (
    <>
      <div className="services-banner">
        <div className="services-banner-content">
          <h1>SERVICES</h1>
          <div className="breadcrumb">
            <span>POLESIN</span>
          </div>
        </div>
      </div>
      
      <Services />
    </>
  );
}
