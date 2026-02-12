import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { ScoreCard } from '../components/ui/ScoreCard';
import { MilestoneTimeline } from '../components/ui/MilestoneTimeline';
import {
  MILESTONE_ROADMAP,
  computeDiagnosisScores,
  getDiagnosisNarrative,
  getEscalationWarning,
} from '../data/config';

export const DiagnosisScreen = ({ onNext, data }) => {
  const dogName = data.dogName || 'Your dog';
  const chatResponses = data.chatResponses || {};
  const scores = computeDiagnosisScores(chatResponses);
  const narrative = getDiagnosisNarrative(dogName, scores, chatResponses.goal);
  const escalation = getEscalationWarning(dogName, data.age, chatResponses.severity || 50, chatResponses.goal);
  const hasSensitivityData = Object.keys(chatResponses.sensitivities || {}).length > 0;

  return (
    <div className="h-full bg-bg-cream flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-14 pb-4 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-3"
          >
            <span>Assessment Complete</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-800">{dogName}'s Diagnosis</h1>
        </motion.div>

        <div className="px-4 grid grid-cols-2 gap-3 mb-6">
          <ScoreCard label="Leadership" score={scores.leadership} icon="👑" delay={0.2} />
          <ScoreCard label="Boundaries" score={scores.boundaries} icon="🚧" delay={0.3} />
          <ScoreCard label="Essentials" score={scores.essentials} icon="🎯" delay={0.4} />
          <ScoreCard label="Reactivity" score={scores.reactivity} icon="⚡" invertedScale delay={0.5} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mx-4 mb-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
        >
          <p className="text-sm text-gray-700 leading-relaxed">{narrative}</p>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="mt-3 flex items-center gap-1.5 text-[#E07B39] font-semibold text-sm"
          >
            Learn More About {dogName}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Escalation Warning */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mx-4 mb-6 bg-amber-50 rounded-xl p-4 border border-amber-200"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">{escalation}</p>
          </div>
        </motion.div>

        {/* Milestone Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mx-4 mb-6"
        >
          <h3 className="text-base font-bold text-gray-800 mb-4">Your path forward</h3>
          <MilestoneTimeline milestones={MILESTONE_ROADMAP} />
        </motion.div>
      </div>

      {/* CTA - Fixed bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="p-4 bg-bg-cream border-t border-gray-100"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full py-4 bg-[#E07B39] text-white rounded-full font-semibold text-base hover:bg-[#C86A2E] transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          See My 7-Day Plan
          <ChevronRight className="w-5 h-5" />
        </motion.button>
        <p className="text-center text-xs text-gray-400 mt-2">3-day free trial — full access to your plan</p>
      </motion.div>
    </div>
  );
};

export default DiagnosisScreen;
