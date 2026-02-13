import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Shield, Target, Zap, ArrowRight } from 'lucide-react';

const scoreDetails = {
  leadership: {
    icon: Crown,
    title: 'Leadership',
    good: [
      'No table scraps',
      'Waits at door',
      'No voice raising',
      'No leash pulling',
      'Uses approach signals',
      'Uses play signals',
    ],
    description: 'Leadership is about clear communication and consistent expectations. Dogs with strong leadership habits understand their role and respond better to training.',
    lowAction: 'Start with simple boundary exercises like waiting at doors and using consistent signals.',
    medAction: 'Reinforce existing good habits and add structured play sessions.',
    highAction: 'Build on this solid foundation with advanced obedience training.',
  },
  boundaries: {
    icon: Shield,
    title: 'Boundaries',
    good: [
      'Earns treats',
      'Comes when called',
      'Waits for furniture invite',
      'Respects personal space',
      'Has designated spot',
    ],
    description: 'Boundaries teach your dog self-control and respect for rules. Dogs with clear boundaries are calmer and more confident.',
    lowAction: 'Implement the "earn everything" rule and create clear physical boundaries.',
    medAction: 'Practice impulse control exercises and reward calm behavior.',
    highAction: 'Maintain consistency and introduce new challenges gradually.',
  },
  essentials: {
    icon: Target,
    title: 'Daily Essentials',
    good: [
      'Adequate exercise',
      'Mental stimulation',
      'Consistent routine',
      'Quality nutrition',
      'Sufficient rest',
    ],
    description: 'Daily essentials form the foundation of good behavior. When physical and mental needs are met, problem behaviors decrease.',
    lowAction: 'Audit your daily routine and add one essential at a time.',
    medAction: 'Fine-tune timing and quality of each essential.',
    highAction: 'Maintain excellence and introduce variety to prevent boredom.',
  },
  reactivity: {
    icon: Zap,
    title: 'Reactivity',
    description: 'Reactivity measures your dog\'s sensitivity to triggers. Lower scores indicate a calmer, more adaptable dog.',
    lowAction: 'Continue socialization and exposure to maintain calm behavior.',
    medAction: 'Practice counter-conditioning with triggers at a distance.',
    highAction: 'Start desensitization training and consider professional support for severe cases.',
  },
};

const getActionForScore = (key, score) => {
  const details = scoreDetails[key];
  if (key === 'reactivity') {
    if (score <= 30) return details.lowAction;
    if (score <= 60) return details.medAction;
    return details.highAction;
  }
  if (score >= 71) return details.highAction;
  if (score >= 41) return details.medAction;
  return details.lowAction;
};

const getScoreColor = (key, score) => {
  if (key === 'reactivity') {
    if (score <= 30) return 'text-green-600';
    if (score <= 60) return 'text-amber-600';
    return 'text-red-600';
  }
  if (score >= 71) return 'text-green-600';
  if (score >= 41) return 'text-amber-600';
  return 'text-red-600';
};

const getScoreLabel = (key, score) => {
  if (key === 'reactivity') {
    if (score <= 30) return 'Low reactivity';
    if (score <= 60) return 'Moderate reactivity';
    return 'High reactivity';
  }
  if (score >= 71) return 'Solid';
  if (score >= 41) return 'Needs structure';
  return 'Needs attention';
};

export const DiagnosisDrawer = ({ isOpen, onClose, dogName, scores, counts }) => {
  const scoreEntries = [
    { key: 'leadership', ...scoreDetails.leadership },
    { key: 'boundaries', ...scoreDetails.boundaries },
    { key: 'essentials', ...scoreDetails.essentials },
    { key: 'reactivity', ...scoreDetails.reactivity },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-hidden"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
            </div>
            
            {/* Header */}
            <div className="px-5 pb-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">About {dogName}</h2>
                <p className="text-xs text-gray-500">Detailed score breakdown</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[calc(85vh-80px)] pb-8">
              <div className="px-5 py-4 space-y-4">
                {scoreEntries.map((entry, index) => {
                  const score = scores[entry.key];
                  const Icon = entry.icon;
                  const count = counts?.[entry.key];
                  const colorClass = getScoreColor(entry.key, score);
                  const label = getScoreLabel(entry.key, score);
                  const action = getActionForScore(entry.key, score);
                  
                  return (
                    <motion.div
                      key={entry.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      {/* Score header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm">{entry.title}</h3>
                            <span className={`text-xs font-medium ${colorClass}`}>{label}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {entry.key !== 'reactivity' && count ? (
                            <span className={`text-lg font-bold ${colorClass}`}>
                              {count.positive}/{count.total}
                            </span>
                          ) : (
                            <span className={`text-lg font-bold ${colorClass}`}>{score}%</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-gray-200 rounded-full mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                          className={`h-full rounded-full ${
                            entry.key === 'reactivity'
                              ? score <= 30 ? 'bg-green-500' : score <= 60 ? 'bg-amber-500' : 'bg-red-500'
                              : score >= 71 ? 'bg-green-500' : score >= 41 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                        />
                      </div>
                      
                      {/* Description */}
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                        {entry.description}
                      </p>
                      
                      {/* What to do next */}
                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <div className="flex items-start gap-2">
                          <ArrowRight className="w-3.5 h-3.5 text-[#E07B39] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">What to do next</span>
                            <p className="text-xs text-gray-700 mt-0.5">{action}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Habits checklist (for non-reactivity) */}
                      {entry.good && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                            What we checked
                          </span>
                          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                            {entry.good.map((item, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                <span className="text-[10px] text-gray-600">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
                
                {/* Summary CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-[#E07B39]/10 rounded-xl p-4 text-center"
                >
                  <p className="text-sm text-gray-800 font-medium mb-2">
                    Ready to see your personalized plan?
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    Your 7-day plan is customized based on these scores.
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 bg-[#E07B39] text-white rounded-full text-sm font-semibold hover:bg-[#C86A2E] transition-colors"
                  >
                    Got it, close
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DiagnosisDrawer;
