import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHeart, FiMail, FiPhone, FiCalendar } = FiIcons;

const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <footer ref={ref} className="relative py-16 px-4 bg-gradient-to-br from-dustyBlue-900 via-dustyBlue-800 to-dustyBlue-900 dark:from-gray-900 dark:via-black dark:to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-watercolor opacity-30" />
      
      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blush-300/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <SafeIcon icon={FiHeart} className="w-3 h-3 md:w-4 md:h-4" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-script text-3xl md:text-4xl text-cream-100 mb-4">
            Thank You for Being Part of Our Story
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300 mx-auto mb-6" />
          <p className="font-serif text-lg text-cream-200 italic max-w-2xl mx-auto">
            "Love is not just about finding the right person, but being the right person for each other."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {/* Contact Info */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <SafeIcon icon={FiMail} className="w-5 h-5 text-blush-300" />
              <h3 className="font-serif text-lg text-cream-100">Contact Us</h3>
            </div>
            <p className="font-serif text-cream-200 text-sm">
              sarah.michael@wedding.com
            </p>
            <p className="font-serif text-cream-200 text-sm">
              (555) 123-4567
            </p>
          </div>

          {/* Wedding Date */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <SafeIcon icon={FiCalendar} className="w-5 h-5 text-lavender-300" />
              <h3 className="font-serif text-lg text-cream-100">Save The Date</h3>
            </div>
            <p className="font-serif text-cream-200 text-sm">
              September 15, 2024
            </p>
            <p className="font-serif text-cream-200 text-sm">
              Rose Garden Estate
            </p>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <SafeIcon icon={FiHeart} className="w-5 h-5 text-blush-300" />
              <h3 className="font-serif text-lg text-cream-100">Follow Our Journey</h3>
            </div>
            <p className="font-serif text-cream-200 text-sm">
              #SarahAndMichael2024
            </p>
            <p className="font-serif text-cream-200 text-sm">
              Share your memories with us!
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center border-t border-cream-200/20 pt-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <SafeIcon icon={FiHeart} className="w-6 h-6 text-blush-300" />
            </motion.div>
          </div>
          
          <p className="font-serif text-cream-200 text-sm mb-2">
            Made with love for Sarah & Michael
          </p>
          
          <p className="font-serif text-cream-300/60 text-xs">
            "The Journey Begins" – A Storybook Wedding Template by Mrake Agency
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;