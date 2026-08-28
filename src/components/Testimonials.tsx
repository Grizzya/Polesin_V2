import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('Testimonials');

  return (
    <section className="testimonial-section-v2">
      <div className="container">
        <div className="section-header">
          <p>{t('tag')}</p>
          <h2>{t('title')}</h2>
        </div>
        <div className="testimonial-grid-v2">
          {/* Testimoni 1 */}
          <div className="testimonial-card-v2">
            <div className="card-header">
              <Image src="https://placehold.co/60x60/0D4884/FFFFFF?text=A" alt="User profile picture" width={60} height={60} className="profile-pic" unoptimized />
              <div className="user-details">
                <h3>{t('testi1_name')}</h3>
                <div className="star-rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
            <p className="review-text-v2">
              {t('testi1_text')}
            </p>
          </div>

          {/* Testimoni 2 */}
          <div className="testimonial-card-v2">
            <div className="card-header">
              <Image src="https://placehold.co/60x60/0D4884/FFFFFF?text=J" alt="User profile picture" width={60} height={60} className="profile-pic" unoptimized />
              <div className="user-details">
                <h3>{t('testi2_name')}</h3>
                <div className="star-rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
            <p className="review-text-v2">
              {t('testi2_text')}
            </p>
          </div>

          {/* Testimoni 3 */}
          <div className="testimonial-card-v2">
            <div className="card-header">
              <Image src="https://placehold.co/60x60/0D4884/FFFFFF?text=R" alt="User profile picture" width={60} height={60} className="profile-pic" unoptimized />
              <div className="user-details">
                <h3>{t('testi3_name')}</h3>
                <div className="star-rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
            <p className="review-text-v2">
              {t('testi3_text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
