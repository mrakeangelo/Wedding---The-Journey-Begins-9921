import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWeddingData } from '../../contexts/WeddingDataContext';

const { FiCalendar, FiClock, FiMapPin, FiUsers, FiHeart } = FiIcons;

const WeddingDetailsSection = () => {
  const { weddingData } = useWeddingData();
  const { weddingDetails } = weddingData;
  
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

  const details = [
    {
      icon: FiCalendar,
      label: "Date",
      value: weddingDetails.date,
      color: "text-blush-500"
    },
    {
      icon: FiClock,
      label: "Time",
      value: weddingDetails.time,
      color: "text-lavender-500"
    },
    {
      icon: FiMapPin,
      label: "Venue",
      value: weddingDetails.venue,
      color: "text-dustyBlue-500"
    },
    {
      icon: FiUsers,
      label: "Dress Code",
      value: weddingDetails.dressCode,
      color: "text-blush-500"
    }
  ];

  return (
    <section ref={ref} className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blush-50/30 via-cream-50/30 to-lavender-50/30 dark:from-gray-800/30 dark:via-gray-700/30 dark:to-gray-900/30" />
      
      {/* Decorative Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blush-200/20 dark:text-blush-400/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-dustyBlue-700 dark:text-dustyBlue-300 mb-4">
            Join Us For Our Special Day
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300 mx-auto mb-6" />
          <p className="font-serif text-lg text-dustyBlue-600 dark:text-dustyBlue-300 italic max-w-2xl mx-auto">
            "We can't wait to celebrate with you as we begin this new chapter of our love story"
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {details.map((detail, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blush-200/50 dark:border-gray-600/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blush-100 to-lavender-100 dark:from-blush-900/30 dark:to-lavender-900/30 group-hover:scale-110 transition-transform duration-300`}>
                  <SafeIcon icon={detail.icon} className={`w-6 h-6 ${detail.color}`} />
                </div>
                <div>
                  <h3 className="font-serif text-sm text-dustyBlue-500 dark:text-dustyBlue-400 uppercase tracking-wide">
                    {detail.label}
                  </h3>
                </div>
              </div>
              <p className="font-serif text-xl text-dustyBlue-700 dark:text-dustyBlue-300 leading-relaxed">
                {detail.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Address Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-gradient-to-br from-white/90 to-cream-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blush-200/50 dark:border-gray-600/50 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <SafeIcon icon={FiMapPin} className="w-6 h-6 text-dustyBlue-500" />
            <h3 className="font-serif text-xl text-dustyBlue-700 dark:text-dustyBlue-300">
              Venue Address
            </h3>
          </div>
          <p className="font-serif text-lg text-dustyBlue-600 dark:text-dustyBlue-300 mb-6">
            {weddingDetails.address}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blush-400 to-lavender-400 hover:from-blush-500 hover:to-lavender-500 text-white px-8 py-3 rounded-full font-serif text-lg shadow-lg transition-all duration-300"
          >
            <SafeIcon icon={FiMapPin} className="w-5 h-5" />
            Get Directions
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingDetailsSection;