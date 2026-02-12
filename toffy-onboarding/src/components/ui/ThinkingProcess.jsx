import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  CheckCircle2,
  Search,
  Cpu,
  Sparkles,
  Target,
  ClipboardList,
  Gauge,
} from 'lucide-react';

const DEFAULT_STEPS = [
  { id: 'analyze', label: 'Analyzing behavior patterns', icon: 'search' },
  { id: 'patterns', label: 'Identifying leadership gaps', icon: 'brain' },
  { id: 'compare', label: 'Synthesizing expert protocols', icon: 'cpu' },
  { id: 'synthesize', label: 'Structuring personalization', icon: 'sparkles' },
];

const ICON_LIBRARY = {
  search: Search,
  brain: Brain,
  cpu: Cpu,
  sparkles: Sparkles,
  target: Target,
  clipboard: ClipboardList,
  gauge: Gauge,
};

export const ThinkingProcess = ({ steps, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const hasCompletedRef = useRef(false);
  const stepList = steps && steps.length > 0 ? steps : DEFAULT_STEPS;
  const totalSteps = stepList.length;

  useEffect(() => {
    if (totalSteps === 0) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete();
      }
      return undefined;
    }

    if (hasCompletedRef.current) {
      return undefined;
    }

    if (activeStep < totalSteps) {
      const timer = setTimeout(() => {
        setActiveStep(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      hasCompletedRef.current = true;
      const completionTimer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(completionTimer);
    }
  }, [activeStep, onComplete, totalSteps]);

  return (
    <div className="flex flex-col gap-4 w-full py-2">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Cpu className="w-4 h-4 text-[#E07B39]" />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 text-[#E07B39] blur-sm"
            >
              <Cpu className="w-4 h-4" />
            </motion.div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Reasoning Protocol</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.2, 1],
                backgroundColor: ['#E5E7EB', '#E07B39', '#E5E7EB']
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                delay: i * 0.2 
              }}
              className="w-1 h-1 rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {stepList.map((step, idx) => {
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;
          const IconComponent = ICON_LIBRARY[step.icon] || Brain;

          return (
            <div key={step.id} className="relative">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1 rounded-md transition-colors duration-300 ${isCompleted ? 'bg-green-50' : isActive ? 'bg-[#E07B39]/10' : 'bg-gray-50'}`}>
                    <IconComponent className={`w-3 h-3 ${isCompleted ? 'text-green-500' : isActive ? 'text-[#E07B39]' : 'text-gray-400'}`} />
                  </div>
                  <span className={`text-[12px] font-medium transition-colors duration-300 ${isCompleted ? 'text-gray-400 line-through decoration-gray-300' : isActive ? 'text-gray-900' : 'text-gray-300'}`}>
                    {step.label}
                  </span>
                </div>
                {isCompleted && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    <span className="text-[10px] text-green-600 font-bold">DONE</span>
                  </motion.div>
                )}
                {isActive && (
                  <div className="flex items-center gap-1">
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-[10px] text-[#E07B39] font-bold tabular-nums"
                    >
                      PROCESSING
                    </motion.span>
                  </div>
                )}
              </div>
              
              <div className="h-2 w-full bg-gray-50 rounded-sm overflow-hidden border border-gray-100/50 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: isCompleted ? '100%' : isActive ? '100%' : '0%',
                  }}
                  transition={{ 
                    duration: isActive ? 1.2 : 0.3,
                    ease: "linear"
                  }}
                  className={`h-full relative ${isCompleted ? 'bg-green-500/20' : isActive ? 'bg-[#E07B39]/20' : 'bg-transparent'}`}
                >
                   {isActive && (
                    <motion.div 
                      initial={{ left: '-100%' }}
                      animate={{ left: '100%' }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#E07B39] to-transparent opacity-40"
                    />
                   )}
                   {isCompleted && (
                     <div className="absolute inset-0 bg-green-500/10" />
                   )}
                </motion.div>
                
                {/* Segmented Grid Overlay */}
                <div className="absolute inset-0 flex justify-between px-[2px] pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-[1px] h-full bg-white/40" />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeStep === totalSteps && totalSteps > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-2 rounded-lg bg-green-50 border border-green-100 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-green-600" />
            <span className="text-[11px] text-green-700 font-semibold">Comprehension complete. Ready to proceed.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
