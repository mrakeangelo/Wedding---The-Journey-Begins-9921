import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWeddingData } from '../../contexts/WeddingDataContext';

const { FiHeart, FiChevronLeft, FiChevronRight } = FiIcons;

const QuotesSection = () => {
  const { weddingData } = useWeddingData();
  const { quotes } = weddingData;
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [quotes.length, isAutoPlaying]);

  const nextQuote = () => {
    setIsAutoPlaying(false);
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setIsAutoPlaying(false);
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const goToQuote = (index) => {
    setIsAutoPlaying(false);
    setCurrentQuote(index);
  };

  return (
    <section ref={ref} className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-lavender-50/40 via-blush-50/40 to-cream-50/40 dark:from-gray-900/40 dark:via-gray-800/40 dark:to-gray-700/40" />
      
      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blush-200/30 dark:text-blush-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <SafeIcon icon={FiHeart} className="w-3 h-3 md:w-4 md:h-4" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-dustyBlue-700 dark:text-dustyBlue-300 mb-4">
            Words from the Heart
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300 mx-auto mb-6" />
          <p className="font-serif text-lg text-dustyBlue-600 dark:text-dustyBlue-300 italic">
            "Love stories told by those who know us best"
          </p>
        </motion.div>

        <div className="relative">
          {/* Quote Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-blush-200/50 dark:border-gray-600/50 min-h-[300px] flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-8">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-6"
                  >
                    <SafeIcon icon={FiHeart} className="w-12 h-12 text-blush-400 mx-auto" />
                  </motion.div>
                  
                  <blockquote className="font-serif text-xl md:text-2xl text-dustyBlue-700 dark:text-dustyBlue-300 italic leading-relaxed mb-6">
                    "{quotes[currentQuote]?.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300" />
                    <cite className="font-serif text-dustyBlue-600 dark:text-dustyBlue-400 not-italic">
                      {quotes[currentQuote]?.author}
                    </cite>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-lavender-300 to-blush-300" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <motion.button
              onClick={prevQuote}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-blush-100 dark:bg-blush-900/30 hover:bg-blush-200 dark:hover:bg-blush-800/30 rounded-full flex items-center justify-center text-blush-600 dark:text-blush-400 transition-colors duration-300 shadow-lg"
            >
              <SafeIcon icon={FiChevronLeft} className="w-6 h-6" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {quotes.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToQuote(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuote
                      ? 'bg-blush-400 scale-125'
                      : 'bg-blush-200 dark:bg-blush-600 hover:bg-blush-300 dark:hover:bg-blush-500'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextQuote}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-blush-100 dark:bg-blush-900/30 hover:bg-blush-200 dark:hover:bg-blush-800/30 rounded-full flex items-center justify-center text-blush-600 dark:text-blush-400 transition-colors duration-300 shadow-lg"
            >
              <SafeIcon icon={FiChevronRight} className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Auto-play Indicator */}
          <div className="flex justify-center mt-4">
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-serif transition-all duration-300 ${
                isAutoPlaying
                  ? 'bg-blush-100 dark:bg-blush-900/30 text-blush-600 dark:text-blush-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;