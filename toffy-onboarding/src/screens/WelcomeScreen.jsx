import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const WelcomeScreen = ({ onNext }) => {
  return (
    <div className="h-full bg-bg-cream flex flex-col items-center justify-between py-8 px-6">
      {/* Top Section - Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mt-4"
      >
        <span className="text-5xl font-bold text-gray-800">t</span>
        <span className="text-5xl">🐾</span>
        <span className="text-5xl font-bold text-gray-800">ffy</span>
      </motion.div>

      {/* Middle Section - Headline & Social Proof */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col items-center text-center flex-1 justify-center"
      >
        {/* Main Headline */}
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          Expert dog training,
          <br />
          powered by AI
        </h1>

        {/* Social Proof - Dog Avatars */}
        <div className="flex items-center gap-3 mb-6 mt-6">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-bg-orange flex items-center justify-center border-2 border-bg-cream">
              <span className="text-lg">🐕</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-bg-cream">
              <span className="text-lg">🐩</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-bg-orange flex items-center justify-center border-2 border-bg-cream">
              <span className="text-lg">🦮</span>
            </div>
          </div>
          <span className="text-gray-600 font-medium">50,000+ dogs trained</span>
        </div>

        {/* How it works - Clean minimalist steps */}
        <div className="flex items-center gap-1 mb-6">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm">
            <div className="w-5 h-5 rounded-full bg-[#E07B39]/10 flex items-center justify-center">
              <span className="text-[#E07B39] text-[10px] font-bold">1</span>
            </div>
            <span className="text-[11px] text-gray-600 font-medium">Quick assessment</span>
          </div>
          <div className="w-3 h-px bg-gray-200"></div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm">
            <div className="w-5 h-5 rounded-full bg-[#E07B39]/10 flex items-center justify-center">
              <span className="text-[#E07B39] text-[10px] font-bold">2</span>
            </div>
            <span className="text-[11px] text-gray-600 font-medium">Get diagnosis</span>
          </div>
          <div className="w-3 h-px bg-gray-200"></div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm">
            <div className="w-5 h-5 rounded-full bg-[#E07B39]/10 flex items-center justify-center">
              <span className="text-[#E07B39] text-[10px] font-bold">3</span>
            </div>
            <span className="text-[11px] text-gray-600 font-medium">Follow plan</span>
          </div>
        </div>

        {/* Mascot with Sparkle */}
        <div className="relative">
          <div className="w-56 h-56 rounded-full bg-bg-orange/50 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-8xl">🐕</span>
            </motion.div>
          </div>
          {/* Sparkle decoration */}
          <motion.div
            animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-8"
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Section - CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full space-y-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full py-4 bg-[#E07B39] text-white rounded-full font-semibold text-lg hover:bg-[#C86A2E] transition-colors shadow-lg"
        >
          Get Your Free Training Plan
        </motion.button>

        <p className="text-center text-xs text-gray-400 -mt-2">3-day free trial. No credit card required.</p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full text-[#E07B39] font-medium text-xs hover:text-[#C86A2E] transition-colors"
        >
          Already have an account? Log In
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
