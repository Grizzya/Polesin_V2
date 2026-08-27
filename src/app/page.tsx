'use client';

import { useEffect } from 'react';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  useEffect(() => {
    // Animation on scroll logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, .slide-up-on-scroll');
    elementsToAnimate.forEach((el) => observer.observe(el));

    // Hero slider animation
    const track = document.querySelector('.hero-slider-track') as HTMLElement;
    if (track) {
      setTimeout(() => {
        track.style.transform = 'translateX(-100%)';
      }, 100);
    }

    return () => {
      elementsToAnimate.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-slider">
            <div className="hero-slider-track">
              {/* Slide 1 – Indonesia (SEO utama) */}
              <div className="hero-slide">
                <h1>Jasa Poles Lantai di Bali</h1>
                <p>
                  Polesin Bali adalah jasa poles lantai terdekat dan jasa poles lantai murah di Bali yang melayani berbagai kebutuhan seperti jasa poles marmer di Bali dan jasa poles lantai di Bali untuk villa, hotel, rumah, dan kantor. Kami mengutamakan hasil mengkilap, rapi, tahan lama, serta pelayanan profesional dengan harga terjangkau.
                </p>
              </div>

              {/* Slide 2 – Inggris */}
              <div className="hero-slide">
                <h2>Professional Floor Polishing & Cleaning Service in Bali</h2>
                <p>
                  Polesin Bali provides professional floor polishing and high-quality general cleaning services in Bali for villas, homes, hotels, and businesses. We bring surfaces back to life with shiny, long-lasting results.
                </p>
              </div>
            </div>
          </div>

          <a href="https://api.whatsapp.com/send?phone=6285385825320" target="_blank" rel="noopener noreferrer" className="cta-button">
            Contact Us &gt;
          </a>
        </div>
      </section>

      <AboutUs />
      <Services />
      <WhyUs />
      <Testimonials />
    </>
  );
}
