import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function AboutUs() {
  const t = useTranslations('AboutUs');

  return (
    <section className="about-us-section">
      <div className="container">
        <div className="about-us-grid">
          <div className="about-us-images">
            <Image src="/images/about3.webp" alt="Professional cleaning service" width={500} height={500} className="about-img-background animate-on-scroll" />
            <Image src="/images/about4.webp" alt="Detailed cleaning" width={500} height={500} className="about-img-foreground animate-on-scroll delay-1" />
            <div className="experience-box animate-on-scroll">
              3+
              <span>{t('yearsExperience')}</span>
            </div>
          </div>
          <div className="about-us-content">
            <div className="about-us-content animate-on-scroll">
              <p className="section-tag">{t('tag')}</p>
              <h2>{t('title')}</h2>
              <p>
                {t('description')}
              </p>
              <ul>
                <li><i className="fas fa-check-square"></i> {t('list1')}</li>
                <li><i className="fas fa-check-square"></i> {t('list2')}</li>
                <li><i className="fas fa-check-square"></i> {t('list3')}</li>
                <li><i className="fas fa-check-square"></i> {t('list4')}</li>
              </ul>
              <a href="https://api.whatsapp.com/send?phone=6285385825320" target="_blank" rel="noopener noreferrer" className="btn-book-now">{t('button')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
