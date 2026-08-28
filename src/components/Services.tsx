'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('Services');
  const [modalData, setModalData] = useState<{title: string, img: string, desc: string, details: string} | null>(null);

  return (
    <>
      <section className="service-section">
        <div className="container">
          <div className="section-header">
            <p>{t('tag')}</p>
            <h2>{t('title')}</h2>
          </div>
          <div className="service-grid">
            {/* KARTU 1: GENERAL CLEANING */}
            <div className="service-card" onClick={() => setModalData({
              title: t('card1_title'),
              img: "/images/DSC00432.webp",
              desc: t('card1_desc'),
              details: t('card1_details')
            })}>
              <Image src="/images/DSC00432.webp" alt="Cleaning Home Service" width={500} height={400} />
              <div className="service-card-content">
                <h3>{t('card1_title')}</h3>
                <span className="arrow-link"><i className="fas fa-arrow-right"></i></span>
              </div>
            </div>

            {/* KARTU 2: FLOOR POLISHING */}
            <div className="service-card" onClick={() => setModalData({
              title: t('card2_title'),
              img: "/images/DSC00358.webp",
              desc: t('card2_desc'),
              details: t('card2_details')
            })}>
              <Image src="/images/DSC00358.webp" alt="Floor Polishing Service" width={500} height={400} />
              <div className="service-card-content">
                <h3>{t('card2_title')}</h3>
                <span className="arrow-link"><i className="fas fa-arrow-right"></i></span>
              </div>
            </div>

            {/* KARTU 3: WALL POLISHING */}
            <div className="service-card" onClick={() => setModalData({
              title: t('card3_title'),
              img: "/images/DSC00431.webp",
              desc: t('card3_desc'),
              details: t('card3_details')
            })}>
              <Image src="/images/DSC00431.webp" alt="Deep Cleaning Service" width={500} height={400} />
              <div className="service-card-content">
                <h3>{t('card3_title')}</h3>
                <span className="arrow-link"><i className="fas fa-arrow-right"></i></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalData && (
        <div className="modal-overlay" onClick={() => setModalData(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalData(null)}>&times;</button>
            <Image src={modalData.img} alt={modalData.title} width={600} height={400} className="modal-img" />
            <h2 className="modal-title">{modalData.title}</h2>
            <p className="modal-description">{modalData.desc}</p>
            <p className="modal-details">{modalData.details}</p>
            <a href="https://wa.me/6285385825320?text=Halo,%20saya%20tertarik%20dengan%20layanan%20Anda."
               className="btn-book-now modal-wa-button"
               target="_blank" rel="noopener noreferrer">
               {t('contactWhatsApp')}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
