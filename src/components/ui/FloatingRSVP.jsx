import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHeart } = FiIcons;

const FloatingRSVP = ({ show }) => {
  const scrollToRSVP = () => {
    const rsvpSection = document.querySelector('#rsvp-section');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToRSVP}
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blush-400 to-lavender-400 hover:from-blush-500 hover:to-lavender-500 text-white px-6 py-3 rounded-full shadow-xl font-serif text-lg flex items-center gap-2 transition-all duration-300"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <SafeIcon icon={FiHeart} className="w-5 h-5" />
          </motion.div>
          RSVP
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingRSVP;