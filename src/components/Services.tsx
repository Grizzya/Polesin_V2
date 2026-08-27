'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Services() {
  const [modalData, setModalData] = useState<{title: string, img: string, desc: string, details: string} | null>(null);

  return (
    <>
      <section className="service-section">
        <div className="container">
          <div className="section-header">
            <p>POLESIN</p>
            <h2>SERVICE</h2>
          </div>
          <div className="service-grid">
            {/* KARTU 1: GENERAL CLEANING */}
            <div className="service-card" onClick={() => setModalData({
              title: "General Cleaning",
              img: "/images/DSC00432.webp",
              desc: "Our house cleaning services include everything from sweeping, mopping, and dusting to cleaning bathrooms and kitchens. We'll leave your home sparkling.",
              details: "Daily cleaning | Deep cleaning | Post-construction cleaning | Sofa cleaning | Floor cleaning for ceramic"
            })}>
              <Image src="/images/DSC00432.webp" alt="Cleaning Home Service" width={500} height={400} />
              <div className="service-card-content">
                <h3>General Cleaning</h3>
                <span className="arrow-link"><i className="fas fa-arrow-right"></i></span>
              </div>
            </div>

            {/* KARTU 2: FLOOR POLISHING */}
            <div className="service-card" onClick={() => setModalData({
              title: "Floor Polishing",
              img: "/images/DSC00358.webp",
              desc: "Restore the shine of your marble, granite, or terrazzo floors. We use special machines and chemicals to remove scratches and dullness, leaving your floors looking like new.",
              details: "Marble Polishing | Concrete Polishing | Terrazzo Polishing | Granite Polishing | Ceramic Polishing | Restoration of dull or stained marble | Surface Coating & Protection"
            })}>
              <Image src="/images/DSC00358.webp" alt="Floor Polishing Service" width={500} height={400} />
              <div className="service-card-content">
                <h3>Floor Polishing</h3>
                <span className="arrow-link"><i className="fas fa-arrow-right"></i></span>
              </div>
            </div>

            {/* KARTU 3: WALL POLISHING */}
            <div className="service-card" onClick={() => setModalData({
              title: "Wall Polishing",
              img: "/images/DSC00431.webp",
              desc: "Deep cleaning for even the dirtiest areas. Perfect for cleaning after renovations or preparing for special events. We clean every corner.",
              details: "Cleaning | Deep Cleaning | General Cleaning"
            })}>
              <Image src="/images/DSC00431.webp" alt="Deep Cleaning Service" width={500} height={400} />
              <div className="service-card-content">
                <h3>Wall Polishing</h3>
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
               Contact via WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
