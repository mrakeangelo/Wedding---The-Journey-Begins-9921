import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWeddingData } from '../../contexts/WeddingDataContext';

const { FiGift, FiHeart, FiHome, FiCoffee, FiMapPin, FiSun } = FiIcons;

const RegistrySection = () => {
  const { weddingData } = useWeddingData();
  const { registry } = weddingData;
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const iconMap = {
    Home: FiHome,
    Coffee: FiCoffee,
    MapPin: FiMapPin,
    Flower: FiSun,
    Gift: FiGift
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section ref={ref} className="relative py-20 px-4 bg-gradient-to-br from-blush-50/30 via-cream-50/30 to-lavender-50/30 dark:from-gray-800/30 dark:via-gray-700/30 dark:to-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <SafeIcon icon={FiGift} className="w-8 h-8 text-blush-500" />
            <h2 className="font-script text-4xl md:text-5xl text-dustyBlue-700 dark:text-dustyBlue-300">
              Our Wish List
            </h2>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300 mx-auto mb-6" />
          <p className="font-serif text-lg text-dustyBlue-600 dark:text-dustyBlue-300 italic max-w-2xl mx-auto">
            "Your presence is the greatest gift, but if you'd like to help us start our new life together..."
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {registry.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blush-200/50 dark:border-gray-600/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-16 h-16 bg-gradient-to-br from-blush-100 to-lavender-100 dark:from-blush-900/30 dark:to-lavender-900/30 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300"
                  >
                    <SafeIcon 
                      icon={iconMap[item.icon] || FiGift} 
                      className="w-8 h-8 text-blush-500 dark:text-blush-400" 
                    />
                  </motion.div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-dustyBlue-700 dark:text-dustyBlue-300 mb-2">
                    {item.item}
                  </h3>
                  <p className="font-serif text-dustyBlue-600 dark:text-dustyBlue-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <motion.div
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <SafeIcon icon={FiHeart} className="w-6 h-6 text-blush-400" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Registry Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blush-200/50 dark:border-gray-600/50">
            <h3 className="font-script text-2xl text-dustyBlue-700 dark:text-dustyBlue-300 mb-6">
              Where to Find Our Registry
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blush-400 to-lavender-400 hover:from-blush-500 hover:to-lavender-500 text-white px-8 py-4 rounded-full font-serif text-lg shadow-lg transition-all duration-300"
              >
                <SafeIcon icon={FiGift} className="w-5 h-5" />
                View Registry
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-dustyBlue-100 dark:bg-dustyBlue-900/30 hover:bg-dustyBlue-200 dark:hover:bg-dustyBlue-800/30 text-dustyBlue-600 dark:text-dustyBlue-300 px-8 py-4 rounded-full font-serif text-lg shadow-lg transition-all duration-300"
              >
                <SafeIcon icon={FiHeart} className="w-5 h-5" />
                Contribute to Honeymoon Fund
              </motion.button>
            </div>

            <div className="mt-8 pt-6 border-t border-blush-200/50 dark:border-gray-600/50">
              <p className="font-serif text-dustyBlue-600 dark:text-dustyBlue-400 text-sm italic">
                "The most precious gift you can give us is your presence on our special day. 
                Everything else is just the cherry on top of our happiness!"
              </p>
            </div>
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
            <div className="w-2 h-2 bg-blush-400 rounded-full animate-pulse" />
            <div className="w-3 h-3 bg-lavender-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <SafeIcon icon={FiGift} className="w-6 h-6 text-blush-500 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="w-3 h-3 bg-lavender-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="w-2 h-2 bg-blush-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrySection;