import Image from 'next/image';

export default function AboutUs() {
  return (
    <section className="about-us-section">
      <div className="container">
        <div className="about-us-grid">
          <div className="about-us-images">
            <Image src="/images/about3.webp" alt="Professional cleaning service" width={500} height={500} className="about-img-background animate-on-scroll" />
            <Image src="/images/about4.webp" alt="Detailed cleaning" width={500} height={500} className="about-img-foreground animate-on-scroll delay-1" />
            <div className="experience-box animate-on-scroll">
              3+
              <span>Years Experience</span>
            </div>
          </div>
          <div className="about-us-content">
            <div className="about-us-content animate-on-scroll">
              <p className="section-tag">ABOUT US</p>
              <h2>Delivering High-Quality Polishing and Cleaning Services Across Bali Since 2022</h2>
              <p>
                From luxury villas to everyday homes, Polesin Bali brings expert care and attention to every surface. We specialize in floor polishing, deep cleaning, and detailed restoration that leave your spaces looking spotless and refreshed. Trusted, insured, and always committed to quality we make clean look effortless.
              </p>
              <ul>
                <li><i className="fas fa-check-square"></i> Experienced and trained professionals</li>
                <li><i className="fas fa-check-square"></i> Satisfaction guaranteed on every service</li>
                <li><i className="fas fa-check-square"></i> Trusted by homes, villas, and businesses</li>
                <li><i className="fas fa-check-square"></i> Flexible scheduling, always on time</li>
              </ul>
              <a href="https://api.whatsapp.com/send?phone=6285385825320" target="_blank" rel="noopener noreferrer" className="btn-book-now">Book Now!</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
