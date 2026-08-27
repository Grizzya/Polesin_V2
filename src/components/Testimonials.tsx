import Image from 'next/image';

export default function Testimonials() {
  return (
    <section className="testimonial-section-v2">
      <div className="container">
        <div className="section-header">
          <p>POLESIN</p>
          <h2>TESTIMONY</h2>
        </div>
        <div className="testimonial-grid-v2">
          {/* Testimoni 1 */}
          <div className="testimonial-card-v2">
            <div className="card-header">
              <Image src="https://placehold.co/60x60/0D4884/FFFFFF?text=A" alt="User profile picture" width={60} height={60} className="profile-pic" unoptimized />
              <div className="user-details">
                <h3>Andrian</h3>
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
              Luar biasa hasil poles marmer di Bali dari tim Polesin! Lantai villa saya yang tadinya kusam sekarang mengkilap seperti baru. Pengerjaannya rapi, detail, dan sangat profesional. Sangat merekomendasikan layanan poles lantai marmer di Bali ini.
            </p>
          </div>

          {/* Testimoni 2 */}
          <div className="testimonial-card-v2">
            <div className="card-header">
              <Image src="https://placehold.co/60x60/0D4884/FFFFFF?text=J" alt="User profile picture" width={60} height={60} className="profile-pic" unoptimized />
              <div className="user-details">
                <h3>Jessica</h3>
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
              Awalnya ragu cari jasa poles lantai murah di Bali, takut hasilnya kurang bagus. Tapi Polesin Bali membuktikan sebaliknya! Harganya sangat bersaing tapi kualitas poles lantai di Bali yang mereka berikan benar-benar memuaskan. Rumah jadi bersih kinclong.
            </p>
          </div>

          {/* Testimoni 3 */}
          <div className="testimonial-card-v2">
            <div className="card-header">
              <Image src="https://placehold.co/60x60/0D4884/FFFFFF?text=R" alt="User profile picture" width={60} height={60} className="profile-pic" unoptimized />
              <div className="user-details">
                <h3>Robert</h3>
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
              Setelah renovasi, lantai rumah berantakan sekali. Untung ketemu Polesin Bali. Layanan poles lantai di Bali mereka benar-benar menyelamatkan. Dari poles lantai marmer sampai teraso, semuanya jadi bersih banget. Timnya juga bisa dipercaya dan kerjanya cepat. Puas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
