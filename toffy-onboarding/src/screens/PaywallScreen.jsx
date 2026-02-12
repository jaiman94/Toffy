import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, Check, Sparkles, Crown, Heart, ChevronLeft } from 'lucide-react';

export const PaywallScreen = ({ onSubscribe, onClose }) => {
  return (
    <div className="h-full bg-bg-cream flex flex-col items-center justify-center p-6 relative">
      {/* Back button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm z-10"
        aria-label="Back"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </motion.button>

      {/* Close button (kept for secondary escape but styled consistently) */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-ink/60 hover:text-ink z-10"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Animated decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Sparkles className="w-8 h-8 text-primary-orange" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <Star className="w-6 h-6 text-primary-orange" />
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-10">
        <Crown className="w-12 h-12 text-primary-orange" />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl p-6 shadow-lg border border-ink/10 relative overflow-hidden"
      >
        {/* Lock icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary-orange/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary-orange" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-ink mb-2">
          Unlock Full Access
        </h1>

        {/* Subtitle */}
        <p className="text-ink/70 text-center mb-6">
          Continue your journey with unlimited lessons and personalized training plans
        </p>

        {/* Features list */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-success-green-light flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-success-green" />
            </div>
            <div>
              <h3 className="font-semibold text-ink">Unlimited Lessons</h3>
              <p className="text-sm text-ink/70">Access all training modules and exercises</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-success-green-light flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-success-green" />
            </div>
            <div>
              <h3 className="font-semibold text-ink">Personalized Plans</h3>
              <p className="text-sm text-ink/70">Custom training plans tailored to your pet</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-success-green-light flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-success-green" />
            </div>
            <div>
              <h3 className="font-semibold text-ink">24/7 Expert Support</h3>
              <p className="text-sm text-ink/70">Get advice from certified trainers anytime</p>
            </div>
          </div>
        </div>

        {/* Pricing card */}
        <div className="bg-gradient-to-br from-primary-orange to-primary-orange-hover rounded-xl p-5 text-white mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg">Premium Plan</h3>
              <p className="text-white/80 text-sm">Unlimited access forever</p>
            </div>
            <div className="bg-white/20 rounded-full p-1.5">
              <Crown className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold">$19</span>
            <span className="text-white/80">/month</span>
          </div>

          <button
            onClick={onSubscribe}
            className="w-full bg-white text-primary-orange font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Subscribe Now
          </button>
        </div>

        {/* Free trial note */}
        <div className="text-center">
          <p className="text-sm text-ink/60">
            7-day free trial • Cancel anytime • No commitment
          </p>
        </div>
      </motion.div>

      {/* Bottom note */}
      <p className="text-ink/60 text-sm mt-6 text-center max-w-xs">
        Already have a subscription?{' '}
        <button className="text-primary-orange font-medium hover:underline">
          Sign in
        </button>
      </p>
    </div>
  );
};

export default PaywallScreen;