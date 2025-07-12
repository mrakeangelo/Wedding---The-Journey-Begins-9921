import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHeart, FiStar } = FiIcons;

const MemorySection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="relative py-20 px-4 bg-gradient-to-br from-gray-100/50 via-gray-200/30 to-gray-300/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-700/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <SafeIcon icon={FiStar} className="w-8 h-8 text-gray-500" />
            <h2 className="font-script text-4xl md:text-5xl text-gray-600 dark:text-gray-400">
              In Loving Memory
            </h2>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-gray-400 to-gray-500 mx-auto mb-8" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-300/50 dark:border-gray-600/50"
          >
            <div className="mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-4"
              >
                <SafeIcon icon={FiHeart} className="w-10 h-10 text-gray-500 mx-auto" />
              </motion.div>
              
              <p className="font-serif text-lg text-gray-600 dark:text-gray-400 italic leading-relaxed">
                "Though you cannot be here with us today, we carry your love in our hearts. 
                Your memory is a blessing that will forever be part of our story."
              </p>
            </div>
            
            <div className="space-y-3">
              <p className="font-serif text-gray-700 dark:text-gray-300">
                Grandma Rose • 1932-2020
              </p>
              <p className="font-serif text-gray-700 dark:text-gray-300">
                Uncle James • 1945-2021
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-300/50 dark:border-gray-600/50">
              <p className="font-serif text-sm text-gray-500 dark:text-gray-500 italic">
                "Love never dies, it only transforms into beautiful memories."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MemorySection;