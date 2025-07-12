import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWeddingData } from '../../contexts/WeddingDataContext';

const { FiClock, FiMapPin, FiHeart } = FiIcons;

const TimelineSection = () => {
  const { weddingData } = useWeddingData();
  const { timeline } = weddingData;
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section ref={ref} className="relative py-20 px-4 bg-gradient-to-br from-cream-50/50 via-blush-50/30 to-lavender-50/50 dark:from-gray-800/50 dark:via-gray-700/30 dark:to-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <SafeIcon icon={FiClock} className="w-8 h-8 text-blush-500" />
            <h2 className="font-script text-4xl md:text-5xl text-dustyBlue-700 dark:text-dustyBlue-300">
              Our Wedding Day Timeline
            </h2>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300 mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blush-300 via-lavender-300 to-blush-300 dark:from-blush-500 dark:via-lavender-500 dark:to-blush-500" />

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex items-start gap-6"
              >
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-4 h-4 bg-blush-400 dark:bg-blush-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
                  {index === Math.floor(timeline.length / 2) && (
                    <motion.div
                      className="absolute -top-2 -left-2 w-8 h-8 bg-blush-200 dark:bg-blush-600 rounded-full opacity-50"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blush-200/50 dark:border-gray-600/50 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-serif text-xl font-semibold text-blush-600 dark:text-blush-400">
                      {item.time}
                    </span>
                    {index === Math.floor(timeline.length / 2) && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <SafeIcon icon={FiHeart} className="w-5 h-5 text-blush-500" />
                      </motion.div>
                    )}
                  </div>
                  <p className="font-serif text-dustyBlue-600 dark:text-dustyBlue-300 text-lg">
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-blush-400 rounded-full" />
            <div className="w-3 h-3 bg-lavender-400 rounded-full" />
            <SafeIcon icon={FiHeart} className="w-6 h-6 text-blush-500" />
            <div className="w-3 h-3 bg-lavender-400 rounded-full" />
            <div className="w-2 h-2 bg-blush-400 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;