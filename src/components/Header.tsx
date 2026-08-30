import {Link} from '@/i18n/routing';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header className="header-wrapper">
      <div className="top-bar">
        <div className="logo">
          <Image src="/images/logo.webp" alt="Logo" width={50} height={50} />
          <Image src="/images/PolishingTULISAN.webp" alt="Polishing" width={150} height={50} />
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61578227744281&locale=id_ID" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://api.whatsapp.com/send?phone=6285385825320" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
          <a href="https://www.instagram.com/polesinbali" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      <div className="nav-bar">
        <nav>
          <ul>
            <li><Link href="/">{t('home')}</Link></li>
            <li><Link href="/services">{t('services')}</Link></li>
            <li><Link href="/about-us">{t('about')}</Link></li>
            <li><Link href="/gallery">{t('gallery')}</Link></li>
            <li><a href="https://api.whatsapp.com/send?phone=6285385825320" target="_blank" rel="noopener noreferrer">{t('contact')}</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
