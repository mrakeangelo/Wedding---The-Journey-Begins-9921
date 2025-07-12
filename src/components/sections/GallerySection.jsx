import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHeart, FiCamera, FiX } = FiIcons;

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop",
      caption: "Our first adventure together",
      handwritten: "Where it all began... 💕"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop",
      caption: "Sunday morning coffee dates",
      handwritten: "Perfect mornings with you ☕"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1529903106945-e52eecbc2b85?w=600&h=800&fit=crop",
      caption: "Dancing in the kitchen",
      handwritten: "Every moment is a celebration 💃"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=600&h=400&fit=crop",
      caption: "Our favorite hiking spot",
      handwritten: "Adventures are better together 🏔️"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600&h=600&fit=crop",
      caption: "Cozy nights at home",
      handwritten: "Home is wherever you are 🏠"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop",
      caption: "The moment we got engaged",
      handwritten: "She said yes! Best day ever! 💍"
    }
  ];

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
    <section ref={ref} className="relative py-20 px-4 bg-gradient-to-br from-cream-50/30 via-blush-50/30 to-lavender-50/30 dark:from-gray-800/30 dark:via-gray-700/30 dark:to-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <SafeIcon icon={FiCamera} className="w-8 h-8 text-blush-500" />
            <h2 className="font-script text-4xl md:text-5xl text-dustyBlue-700 dark:text-dustyBlue-300">
              Love Letter Gallery
            </h2>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300 mx-auto mb-6" />
          <p className="font-serif text-lg text-dustyBlue-600 dark:text-dustyBlue-300 italic max-w-2xl mx-auto">
            "Every picture tells a story, every moment captured is a memory treasured forever"
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className={`relative group cursor-pointer ${
                index % 3 === 0 ? 'lg:col-span-1' : 
                index % 3 === 1 ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <motion.img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dustyBlue-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Handwritten Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-script text-white text-lg mb-1">
                    {image.handwritten}
                  </p>
                  <p className="font-serif text-white/80 text-sm">
                    {image.caption}
                  </p>
                </div>

                {/* Floating Hearts */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-white/60"
                      style={{
                        left: `${30 + Math.random() * 40}%`,
                        top: `${30 + Math.random() * 40}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
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
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute -inset-2 bg-gradient-to-br from-blush-200/20 to-lavender-200/20 dark:from-blush-800/10 dark:to-lavender-800/10 rounded-3xl -z-10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
              
              <img
                src={selectedImage.src}
                alt={selectedImage.caption}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              <div className="p-8 bg-gradient-to-r from-blush-50 to-lavender-50 dark:from-gray-800 dark:to-gray-700">
                <p className="font-script text-2xl text-dustyBlue-700 dark:text-dustyBlue-300 mb-2">
                  {selectedImage.handwritten}
                </p>
                <p className="font-serif text-dustyBlue-600 dark:text-dustyBlue-400">
                  {selectedImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;