import React, { useEffect, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { PawPrint, Check, Loader2 } from 'lucide-react';
import { GENERATION_STEPS, computeDiagnosisScores, getScoreEvidence } from '../data/config';

const CountUp = ({ value, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useAnimationFrame((timeInfo) => {
    const progress = Math.min(timeInfo.delta * 2, 1);
    setDisplayValue((prev) => {
      const next = prev + (value - prev) * progress;
      return Math.round(next);
    });
  });

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

const ComputedBadge = ({ type, data }) => {
  const scores = computeDiagnosisScores(data?.chatResponses || {});
  
  const badgeConfig = {
    leadership: {
      label: 'Leadership',
      getValue: () => scores.leadership,
      suffix: '%',
      healthyRange: '70-100%',
    },
    essentials: {
      label: 'Essentials',
      getValue: () => Math.round(scores.essentials / 20),
      suffix: '/5',
      healthyRange: '4-5/5',
    },
    reactivity: {
      label: 'Reactivity',
      getValue: () => scores.reactivity,
      suffix: '%',
      healthyRange: '0-30%',
    },
  };

  const config = badgeConfig[type];
  if (!config) return null;

  const value = config.getValue();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="ml-auto px-2 py-1 bg-white rounded-full border border-gray-200 shadow-sm"
    >
      <span className="text-[10px] font-medium text-gray-600">
        {config.label}:{' '}
        <span className="text-[#E07B39] font-semibold">
          <CountUp value={value} suffix={config.suffix} />
        </span>
      </span>
      <span className="block text-[9px] text-gray-400">
        Healthy: {config.healthyRange}
      </span>
    </motion.div>
  );
};

export const GenerationScreen = ({ onNext, data }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const dogName = data.dogName || 'your dog';
  const evidence = getScoreEvidence(data?.chatResponses || {});

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
        {`Analyzing your answers to build ${dogName}'s Week 1 plan...`}
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
                className={`text-sm flex-1 ${
                  isComplete
                    ? 'text-green-700'
                    : isCurrent
                    ? 'text-[#E07B39] font-medium'
                    : 'text-gray-500'
                }`}
              >
                {processText(step.label)}
                {isComplete && step.badge && evidence[step.badge]?.length > 0 && (
                  <span className="block text-[11px] text-gray-500 mt-0.5">
                    Evidence: {evidence[step.badge].slice(0, 2).join(' & ')}
                  </span>
                )}
              </span>
              {isComplete && step.badge && (
                <ComputedBadge type={step.badge} data={data} />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default GenerationScreen;
