import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBookOpen, FiHeart } = FiIcons;

const ChapterSection = ({ chapter, chapterNumber, data }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      id={`chapter-${chapterNumber}`}
      ref={ref}
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blush-50/30 to-lavender-50/30 dark:from-transparent dark:via-gray-800/30 dark:to-gray-700/30" />
      
      {/* Chapter Divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300"
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blush-100 dark:bg-blush-900/30 rounded-full">
                <SafeIcon icon={FiBookOpen} className="w-6 h-6 text-blush-500" />
              </div>
              <div>
                <span className="font-serif text-sm text-dustyBlue-500 dark:text-dustyBlue-400 uppercase tracking-wide">
                  Chapter {chapterNumber}
                </span>
              </div>
            </div>

            <h2 className="font-script text-4xl md:text-5xl text-dustyBlue-700 dark:text-dustyBlue-300 mb-4">
              {data.title}
            </h2>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blush-200/50 dark:border-gray-600/50">
              <p className="font-serif text-dustyBlue-600 dark:text-dustyBlue-300 text-lg leading-relaxed mb-6">
                {data.content}
              </p>
              
              <div className="flex items-center gap-2 text-blush-500 dark:text-blush-400">
                <SafeIcon icon={FiHeart} className="w-4 h-4" />
                <span className="font-serif text-sm italic">{data.date}</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <motion.img
                src={data.image}
                alt={data.title}
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                whileHover={{ scale: 1.02 }}
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dustyBlue-900/20 via-transparent to-transparent" />
              
              {/* Floating Hearts on Hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white/60"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 1,
                    }}
                  >
                    <SafeIcon icon={FiHeart} className="w-4 h-4" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blush-200/30 to-lavender-200/30 dark:from-blush-800/20 dark:to-lavender-800/20 rounded-3xl -z-10 blur-xl" />
          </motion.div>
        </motion.div>
      </div>

      {/* Chapter End Decoration */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300"
      />
    </section>
  );
};

export default ChapterSection;