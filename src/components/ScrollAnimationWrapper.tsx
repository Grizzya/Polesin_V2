'use client';

import { useEffect } from 'react';

export default function ScrollAnimationWrapper() {
  useEffect(() => {
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

    return () => {
      elementsToAnimate.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null;
}
