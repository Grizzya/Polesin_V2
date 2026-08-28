import {useTranslations} from 'next-intl';

export default function WhyUs() {
  const t = useTranslations('WhyUs');

  return (
    <section className="why-us-section">
      <div className="container">
        <div className="section-header">
          <h2>{t('title')}</h2>
        </div>
        <div className="why-us-grid">
          <div className="feature-box">
            <div className="feature-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <h3>{t('box1_title')}</h3>
            <p>{t('box1_desc')}</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">
              <i className="fas fa-history"></i>
            </div>
            <h3>{t('box2_title')}</h3>
            <p>{t('box2_desc')}</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>{t('box3_title')}</h3>
            <p>{t('box3_desc')}</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">
              <i className="fas fa-thumbs-up"></i>
            </div>
            <h3>{t('box4_title')}</h3>
            <p>{t('box4_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
