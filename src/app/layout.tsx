import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Polesin Bali | Jasa Poles Lantai di Bali & General Cleaning',
  description: 'Polesin Bali provides professional floor polishing and high-quality general cleaning services in Bali. Experienced team for villas, homes, and businesses. Contact us for a sparkling clean result!',
  keywords: 'floor polishing service bali, general cleaning bali, marble polishing, cleaning service bali, polesin bali, poles marmer di bali, poles granit di bali, poles acian dinding, poles acian dinding di bali, poles terazzo, poles teraso, poles terazzo di bali, poles terazo di bali, poles lantai marmer terdekat, general cleaning di bali, deep cleaning after construction bali, poles batu alam bali, poles batu alam di bali, Poles lantai marmer di bali, Poles lantai murah di bali, Poles lantai di bali',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
