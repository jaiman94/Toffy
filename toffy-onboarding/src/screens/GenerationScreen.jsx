import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Check, Loader2 } from 'lucide-react';
import { GENERATION_STEPS } from '../data/config';

export const GenerationScreen = ({ onNext, data }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const dogName = data.dogName || 'your dog';

  const processText = (text) => text.replace(/{dogName}/g, dogName);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < GENERATION_STEPS.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(onNext, 2000);
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [onNext]);

  return (
    <div className="h-full bg-bg-cream flex flex-col items-center justify-center px-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-1 mb-8"
      >
        <span className="text-2xl font-bold text-gray-800">t</span>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E07B39] to-[#C86A2E] flex items-center justify-center">
          <PawPrint className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-800">ffy</span>
      </motion.div>

      {/* Mascot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mb-8"
      >
        <div className="w-40 h-40 rounded-full bg-bg-orange flex items-center justify-center">
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-7xl">🐕</span>
          </motion.div>
        </div>
        {/* Thinking indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-6 h-6 text-[#E07B39]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-gray-600 text-base mb-8 max-w-xs"
      >
        {`Let me analyze ${dogName}'s profile and build a plan...`}
      </motion.p>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-xs space-y-3"
      >
        {GENERATION_STEPS.map((step, idx) => {
          const isComplete = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isComplete
                  ? 'bg-green-50'
                  : isCurrent
                  ? 'bg-orange-50'
                  : 'bg-white'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isComplete
                    ? 'bg-green-500'
                    : isCurrent
                    ? 'bg-[#E07B39]'
                    : 'bg-gray-200'
                }`}
              >
                {isComplete ? (
                  <Check className="w-4 h-4 text-white" />
                ) : isCurrent ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-4 h-4 text-white" />
                  </motion.div>
                ) : (
                  <span className="text-xs font-medium text-gray-500">{step.id}</span>
                )}
              </div>
              <span
                className={`text-sm ${
                  isComplete
                    ? 'text-green-700'
                    : isCurrent
                    ? 'text-[#E07B39] font-medium'
                    : 'text-gray-500'
                }`}
              >
                {processText(step.label)}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default GenerationScreen;
