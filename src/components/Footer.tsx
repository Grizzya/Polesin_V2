import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <Image src="/images/polesin.webp" alt="Polesin Logo" width={200} height={100} />
          </div>
          <div className="footer-address">
            <p>{t('address')}</p>
          </div>
          <div className="footer-contact">
            <p>085385825320</p>
            <p>Polesinbali@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-line"></div>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/profile.php?id=61578227744281&locale=id_ID" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://api.whatsapp.com/send?phone=6285385825320" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
            <a href="https://www.instagram.com/polesinbali" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="footer-line"></div>
        </div>
      </div>
    </footer>
  );
}
