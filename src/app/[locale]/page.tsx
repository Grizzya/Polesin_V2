import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  const ogLocale = locale === 'id' ? 'id_ID' : 'en_US';
  
  return {
    title: t('home.title'),
    description: t('home.description'),
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
      locale: ogLocale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.title'),
      description: t('home.description')
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        id: '/id',
        'x-default': '/en'
      }
    }
  };
}

export default function Home() {
  const t = useTranslations('Hero');

  return (
    <>
      <ScrollAnimationWrapper />
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-slider">
            <div className="hero-slider-track">
              {/* Single Slide using next-intl */}
              <div className="hero-slide">
                <h1>{t('title')}</h1>
                <p>{t('description')}</p>
              </div>
            </div>
          </div>

          <a href="https://api.whatsapp.com/send?phone=6285385825320" target="_blank" rel="noopener noreferrer" className="cta-button">
            Contact Us &gt;
          </a>
        </div>
      </section>

      <AboutUs />
      <Services />
      <WhyUs />
      <Testimonials />
    </>
  );
}
