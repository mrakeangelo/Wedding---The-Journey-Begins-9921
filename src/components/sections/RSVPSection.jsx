import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWeddingData } from '../../contexts/WeddingDataContext';

const { FiHeart, FiUser, FiMail, FiPhone, FiUsers, FiCheck, FiX } = FiIcons;

const RSVPSection = () => {
  const { addRSVPResponse } = useWeddingData();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: 1,
    dietaryRestrictions: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRSVPResponse(formData);
    setIsSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        attendance: '',
        guests: 1,
        dietaryRestrictions: '',
        message: ''
      });
    }, 5000);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.attendance;
      case 3:
        return formData.attendance === 'no' || formData.guests;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="font-script text-2xl text-dustyBlue-700 dark:text-dustyBlue-300 text-center mb-6">
              Tell us about yourself
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-serif text-dustyBlue-600 dark:text-dustyBlue-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dustyBlue-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-blush-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div>
                <label className="block font-serif text-dustyBlue-600 dark:text-dustyBlue-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dustyBlue-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-blush-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="block font-serif text-dustyBlue-600 dark:text-dustyBlue-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <SafeIcon icon={FiPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dustyBlue-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-blush-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="font-script text-2xl text-dustyBlue-700 dark:text-dustyBlue-300 text-center mb-6">
              Will you be joining us?
            </h3>
            <div className="space-y-4">
              <motion.button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, attendance: 'yes' }))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
                  formData.attendance === 'yes'
                    ? 'border-blush-400 bg-blush-50 dark:bg-blush-900/30'
                    : 'border-blush-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 hover:border-blush-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    formData.attendance === 'yes'
                      ? 'border-blush-400 bg-blush-400'
                      : 'border-dustyBlue-300'
                  }`}>
                    {formData.attendance === 'yes' && (
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="font-serif text-lg text-dustyBlue-700 dark:text-dustyBlue-300">
                      Yes, I'll be there! 💕
                    </h4>
                    <p className="font-serif text-sm text-dustyBlue-500 dark:text-dustyBlue-400">
                      Can't wait to celebrate with you
                    </p>
                  </div>
                </div>
              </motion.button>
              
              <motion.button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, attendance: 'no' }))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
                  formData.attendance === 'no'
                    ? 'border-dustyBlue-400 bg-dustyBlue-50 dark:bg-dustyBlue-900/30'
                    : 'border-blush-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 hover:border-blush-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    formData.attendance === 'no'
                      ? 'border-dustyBlue-400 bg-dustyBlue-400'
                      : 'border-dustyBlue-300'
                  }`}>
                    {formData.attendance === 'no' && (
                      <SafeIcon icon={FiX} className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="font-serif text-lg text-dustyBlue-700 dark:text-dustyBlue-300">
                      Sorry, I can't make it
                    </h4>
                    <p className="font-serif text-sm text-dustyBlue-500 dark:text-dustyBlue-400">
                      Will be there in spirit
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            {formData.attendance === 'yes' ? (
              <>
                <h3 className="font-script text-2xl text-dustyBlue-700 dark:text-dustyBlue-300 text-center mb-6">
                  How many guests?
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-serif text-dustyBlue-600 dark:text-dustyBlue-300 mb-2">
                      Number of Guests (including yourself)
                    </label>
                    <div className="relative">
                      <SafeIcon icon={FiUsers} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dustyBlue-400 w-5 h-5" />
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-blush-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all duration-300"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-serif text-dustyBlue-600 dark:text-dustyBlue-300 mb-2">
                      Dietary Restrictions
                    </label>
                    <textarea
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-blush-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all duration-300"
                      placeholder="Any dietary restrictions or allergies?"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-script text-2xl text-dustyBlue-700 dark:text-dustyBlue-300 text-center mb-6">
                  We'll miss you!
                </h3>
                <div className="text-center p-8 bg-dustyBlue-50 dark:bg-dustyBlue-900/30 rounded-xl">
                  <SafeIcon icon={FiHeart} className="w-12 h-12 text-dustyBlue-400 mx-auto mb-4" />
                  <p className="font-serif text-dustyBlue-600 dark:text-dustyBlue-300">
                    We understand you can't be there in person, but you'll be in our hearts.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="font-script text-2xl text-dustyBlue-700 dark:text-dustyBlue-300 text-center mb-6">
              Any special message?
            </h3>
            <div>
              <label className="block font-serif text-dustyBlue-600 dark:text-dustyBlue-300 mb-2">
                Message for the Happy Couple
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-blush-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all duration-300"
                placeholder="Share your wishes, memories, or anything you'd like to say..."
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section ref={ref} className="relative py-20 px-4 bg-gradient-to-br from-blush-50/30 via-cream-50/30 to-lavender-50/30 dark:from-gray-800/30 dark:via-gray-700/30 dark:to-gray-900/30">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blush-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  x: [0, Math.random() * 200 - 100],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  ease: 'easeOut',
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-script text-4xl md:text-5xl text-dustyBlue-700 dark:text-dustyBlue-300 mb-4">
            RSVP to Our Love Story
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blush-300 to-lavender-300 mx-auto mb-6" />
          <p className="font-serif text-lg text-dustyBlue-600 dark:text-dustyBlue-300 italic">
            Please let us know if you can join us for our special day
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blush-200/50 dark:border-gray-600/50"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-serif text-sm text-dustyBlue-600 dark:text-dustyBlue-300">
                    Step {currentStep} of {totalSteps}
                  </span>
                  <span className="font-serif text-sm text-dustyBlue-600 dark:text-dustyBlue-300">
                    {Math.round((currentStep / totalSteps) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-blush-100 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blush-400 to-lavender-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {renderStep()}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    whileHover={{ scale: currentStep === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: currentStep === 1 ? 1 : 0.95 }}
                    className={`px-6 py-3 rounded-full font-serif transition-all duration-300 ${
                      currentStep === 1
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-dustyBlue-100 dark:bg-dustyBlue-900/30 text-dustyBlue-600 dark:text-dustyBlue-300 hover:bg-dustyBlue-200 dark:hover:bg-dustyBlue-800/30'
                    }`}
                  >
                    Previous
                  </motion.button>

                  {currentStep < totalSteps ? (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      whileHover={{ scale: isStepValid() ? 1.05 : 1 }}
                      whileTap={{ scale: isStepValid() ? 0.95 : 1 }}
                      className={`px-6 py-3 rounded-full font-serif transition-all duration-300 ${
                        isStepValid()
                          ? 'bg-gradient-to-r from-blush-400 to-lavender-400 text-white hover:from-blush-500 hover:to-lavender-500 shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Next
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-blush-400 to-lavender-400 hover:from-blush-500 hover:to-lavender-500 text-white rounded-full font-serif shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <SafeIcon icon={FiHeart} className="w-5 h-5" />
                      Send RSVP
                    </motion.button>
                  )}
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-blush-200/50 dark:border-gray-600/50 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6"
              >
                <SafeIcon icon={FiHeart} className="w-16 h-16 text-blush-500 mx-auto" />
              </motion.div>
              <h3 className="font-script text-3xl text-dustyBlue-700 dark:text-dustyBlue-300 mb-4">
                Thank You!
              </h3>
              <p className="font-serif text-lg text-dustyBlue-600 dark:text-dustyBlue-300 mb-6">
                Your RSVP has been received. We can't wait to celebrate with you!
              </p>
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blush-400 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-lavender-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="w-2 h-2 bg-blush-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RSVPSection;