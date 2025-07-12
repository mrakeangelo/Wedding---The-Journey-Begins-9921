import React from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = ({ scaleX }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blush-400 via-lavender-400 to-blush-400 origin-left z-50 shadow-lg"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;