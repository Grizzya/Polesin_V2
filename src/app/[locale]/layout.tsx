import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';

const inter = Inter({ subsets: ['latin'] });

import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    metadataBase: new URL('https://polesinbali.com'),
    title: t('home.title'),
    description: t('home.description'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        {/* We load CSS files from public/css */}
        <link rel="stylesheet" href="/css/global.css" />
        <link rel="stylesheet" href="/css/header.css" />
        <link rel="stylesheet" href="/css/hero.css" />
        <link rel="stylesheet" href="/css/about.css" />
        <link rel="stylesheet" href="/css/services.css" />
        <link rel="stylesheet" href="/css/why-us.css" />
        <link rel="stylesheet" href="/css/modal.css" />
        <link rel="stylesheet" href="/css/footer.css" />
        <link rel="stylesheet" href="/css/banner.css" />
        <link rel="stylesheet" href="/css/about-us-banner.css" />
        <link rel="stylesheet" href="/css/galerry.css" />
        <link rel="stylesheet" href="/css/review.css" />

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MHKLCMBFBG" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MHKLCMBFBG');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
