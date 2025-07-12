import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWeddingData } from '../../contexts/WeddingDataContext';

const { FiEdit3, FiHeart, FiUser, FiSend, FiMessageCircle } = FiIcons;

const GuestbookSection = () => {
  const { weddingData, addGuestbookEntry } = useWeddingData();
  const { guestbookEntries } = weddingData;
  const [newEntry, setNewEntry] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEntry.name.trim() || !newEntry.message.trim()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      addGuestbookEntry(newEntry);
      setNewEntry({ name: '', message: '' });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
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
    <section ref={ref} className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50/40 via-blush-50/40 to-lavender-50/40 dark:from-gray-800/40 dark:via-gray-700/40 dark:to-gray-900/40" />
      
      {/* Floating Hearts */}
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
              y: [0, -15, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <SafeIcon icon={FiHeart} className="w-3 h-3 md:w-4 md:h-4" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <SafeIcon icon={FiEdit3} className="w-8 h-8 text-blush-500" />
            <h2 className="font-script text-4xl md:text-5xl text-dustyBlue-700 dark:text-dustyBlue-300">
              Sign Our Story
            </h2>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300 mx-auto mb-6" />
          <p className="font-serif text-lg text-dustyBlue-600 dark:text-dustyBlue-300 italic max-w-2xl mx-auto">
            "Leave us a message to remember this special day. Your words will become part of our love story forever."
          </p>
        </motion.div>

        {/* New Entry Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blush-200/50 dark:border-gray-600/50 mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-serif text-dustyBlue-600 dark:text-dustyBlue-300 mb-2">
                Your Name
              </label>
              <div className="relative">
                <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dustyBlue-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={newEntry.name}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-blush-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all duration-300"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-serif text-dustyBlue-600 dark:text-dustyBlue-300 mb-2">
                Your Message
              </label>
              <div className="relative">
                <SafeIcon icon={FiMessageCircle} className="absolute left-3 top-3 text-dustyBlue-400 w-5 h-5" />
                <textarea
                  name="message"
                  value={newEntry.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-blush-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all duration-300"
                  placeholder="Share your wishes, memories, or advice for the happy couple..."
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <motion.button
                type="submit"
                disabled={isSubmitting || !newEntry.name.trim() || !newEntry.message.trim()}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-serif text-lg shadow-lg transition-all duration-300 ${
                  isSubmitting || !newEntry.name.trim() || !newEntry.message.trim()
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blush-400 to-lavender-400 hover:from-blush-500 hover:to-lavender-500 text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Signing...
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSend} className="w-5 h-5" />
                    Sign Our Story
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl text-center"
              >
                <SafeIcon icon={FiHeart} className="w-6 h-6 mx-auto mb-2" />
                <p className="font-serif">Thank you for signing our story! Your message means the world to us.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Existing Entries */}
        {guestbookEntries.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <h3 className="font-script text-2xl text-dustyBlue-700 dark:text-dustyBlue-300 text-center mb-8">
              Messages from Our Loved Ones
            </h3>
            
            {guestbookEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                variants={itemVariants}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blush-200/50 dark:border-gray-600/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blush-100 to-lavender-100 dark:from-blush-900/30 dark:to-lavender-900/30 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="w-6 h-6 text-blush-500" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-serif text-lg text-dustyBlue-700 dark:text-dustyBlue-300 font-semibold">
                        {entry.name}
                      </h4>
                      <SafeIcon icon={FiHeart} className="w-4 h-4 text-blush-400" />
                    </div>
                    
                    <p className="font-serif text-dustyBlue-600 dark:text-dustyBlue-400 leading-relaxed">
                      {entry.message}
                    </p>
                    
                    {entry.timestamp && (
                      <p className="font-serif text-sm text-dustyBlue-400 dark:text-dustyBlue-500 mt-2">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GuestbookSection;