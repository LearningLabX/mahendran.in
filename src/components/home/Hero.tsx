import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      <HeroBackground />
      <HeroContent />
    </section>
  );
}
