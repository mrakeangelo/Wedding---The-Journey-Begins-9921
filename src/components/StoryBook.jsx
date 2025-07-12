import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HeroSection from './sections/HeroSection';
import ChapterSection from './sections/ChapterSection';
import TimelineSection from './sections/TimelineSection';
import WeddingDetailsSection from './sections/WeddingDetailsSection';
import RSVPSection from './sections/RSVPSection';
import GallerySection from './sections/GallerySection';
import QuotesSection from './sections/QuotesSection';
import RegistrySection from './sections/RegistrySection';
import GuestbookSection from './sections/GuestbookSection';
import MemorySection from './sections/MemorySection';
import Footer from './sections/Footer';
import ThemeToggle from './ui/ThemeToggle';
import FloatingRSVP from './ui/FloatingRSVP';
import ScrollProgress from './ui/ScrollProgress';
import { useWeddingData } from '../contexts/WeddingDataContext';

const StoryBook = () => {
  const { weddingData } = useWeddingData();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showFloatingRSVP, setShowFloatingRSVP] = useState(false);

  const { ref: rsvpRef, inView: rsvpInView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  useEffect(() => {
    setShowFloatingRSVP(!rsvpInView);
  }, [rsvpInView]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cream-50 via-blush-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-paper-texture">
      <ScrollProgress scaleX={scaleX} />
      <ThemeToggle />
      <FloatingRSVP show={showFloatingRSVP} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10"
      >
        <HeroSection />
        
        <ChapterSection
          chapter="howWeMet"
          chapterNumber="1"
          data={weddingData.chapters.howWeMet}
        />
        
        <ChapterSection
          chapter="firstDate"
          chapterNumber="2"
          data={weddingData.chapters.firstDate}
        />
        
        <ChapterSection
          chapter="proposal"
          chapterNumber="3"
          data={weddingData.chapters.proposal}
        />
        
        <TimelineSection />
        
        <WeddingDetailsSection />
        
        <div ref={rsvpRef}>
          <RSVPSection />
        </div>
        
        <GallerySection />
        
        <QuotesSection />
        
        <RegistrySection />
        
        <GuestbookSection />
        
        <MemorySection />
        
        <Footer />
      </motion.div>
    </div>
  );
};

export default StoryBook;