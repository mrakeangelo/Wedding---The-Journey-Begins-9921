import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWeddingData } from '../../contexts/WeddingDataContext';

const { FiChevronDown, FiHeart } = FiIcons;

const HeroSection = () => {
  const { weddingData } = useWeddingData();
  const { coupleNames } = weddingData;

  const scrollToNext = () => {
    const nextSection = document.getElementById('chapter-1');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blush-100/30 via-cream-100/30 to-lavender-100/30 dark:from-gray-800/30 dark:via-gray-700/30 dark:to-gray-900/30" />
      
      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blush-300/20 dark:text-pink-400/10"
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
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <SafeIcon icon={FiHeart} className="w-4 h-4 md:w-6 md:h-6" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-script text-4xl md:text-6xl lg:text-7xl text-dustyBlue-600 dark:text-dustyBlue-300 mb-4">
            Once Upon A Time...
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300 mx-auto mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-dustyBlue-800 dark:text-dustyBlue-200">
              {coupleNames.bride}
            </h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <SafeIcon icon={FiHeart} className="w-6 h-6 md:w-8 md:h-8 text-blush-400" />
            </motion.div>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-dustyBlue-800 dark:text-dustyBlue-200">
              {coupleNames.groom}
            </h2>
          </div>
          
          <p className="font-serif text-lg md:text-xl text-dustyBlue-600 dark:text-dustyBlue-300 italic max-w-2xl mx-auto leading-relaxed">
            "Two hearts, one story, endless chapters ahead..."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mb-16"
        >
          <div className="inline-block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-blush-200/50 dark:border-gray-600/50">
            <p className="font-serif text-dustyBlue-700 dark:text-dustyBlue-300 text-lg">
              {weddingData.weddingDetails.date}
            </p>
          </div>
        </motion.div>

        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex flex-col items-center gap-2 text-dustyBlue-600 dark:text-dustyBlue-300 hover:text-blush-500 dark:hover:text-blush-400 transition-colors duration-300"
        >
          <span className="font-serif text-sm uppercase tracking-wide">Begin Our Story</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <SafeIcon icon={FiChevronDown} className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-50/50 to-transparent dark:from-gray-900/50 pointer-events-none" />
    </section>
  );
};

export default HeroSection;