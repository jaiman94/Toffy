import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { ScoreCard } from '../components/ui/ScoreCard';
import { MilestoneTimeline } from '../components/ui/MilestoneTimeline';
import { DiagnosisDrawer } from '../components/ui/DiagnosisDrawer';
import {
  MILESTONE_ROADMAP,
  computeDiagnosisScores,
  getDiagnosisNarrative,
  getDiagnosisEvidence,
  SUBSCRIPTION_CONFIG,
} from '../data/config';

export const DiagnosisScreen = ({ onNext, data }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dogName = data.dogName || 'Your dog';
  const chatResponses = data.chatResponses || {};
  const scores = computeDiagnosisScores(chatResponses);
  const narrative = getDiagnosisNarrative(dogName, scores, chatResponses.goal, chatResponses);
  const evidence = getDiagnosisEvidence(dogName, chatResponses, 2);
  const isHighSeverity = (chatResponses.severity || 50) > 60;

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
            <span>Diagnosis Ready</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-800">{dogName}'s Diagnosis</h1>
        </motion.div>

        <div className="px-4 grid grid-cols-2 gap-3 mb-6">
          <ScoreCard label="Leadership" score={scores.leadership} icon="👑" delay={0.2} count={scores.counts?.leadership} />
          <ScoreCard label="Boundaries" score={scores.boundaries} icon="🚧" delay={0.3} count={scores.counts?.boundaries} />
          <ScoreCard label="Essentials" score={scores.essentials} icon="🎯" delay={0.4} count={scores.counts?.essentials} />
          <ScoreCard label="Reactivity" score={scores.reactivity} icon="⚡" invertedScale delay={0.5} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mx-4 mb-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
        >
          <p className="text-sm text-gray-700 leading-relaxed">{narrative}</p>
          {evidence.length > 0 && (
            <p className="text-xs text-gray-500 mt-3">
              Evidence from your answers: {evidence.join(' and ')}.
            </p>
          )}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setIsDrawerOpen(true)}
            className="mt-3 flex items-center gap-1.5 text-[#E07B39] font-semibold text-sm"
          >
            Learn More About {dogName}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Safety Check */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mx-4 mb-6 bg-emerald-50 rounded-xl p-4 border border-emerald-200"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">Safety Check</p>
              <p className="text-sm text-emerald-900 leading-relaxed mt-1">
                {isHighSeverity
                  ? `Based on what you shared, we'll start with a gentle, safety-first plan for ${dogName}.`
                  : `You're in a good spot to start with a gentle plan and build momentum quickly.`}
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-medium text-sm hover:bg-emerald-700 transition-colors"
                >
                  Start with gentle plan
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 bg-white text-emerald-700 rounded-xl font-medium text-sm border border-emerald-200 hover:bg-emerald-50 transition-colors"
                >
                  Talk to a trainer
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Milestone Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mx-4 mb-6"
        >
          <h3 className="text-base font-bold text-gray-800 mb-4">Your path forward (Weeks 1–4)</h3>
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
          Preview Week 1 Plan
          <ChevronRight className="w-5 h-5" />
        </motion.button>
        <p className="text-center text-xs text-gray-400 mt-2">{SUBSCRIPTION_CONFIG.trialLength}-day free trial — full access to your plan</p>
      </motion.div>

      {/* Diagnosis Detail Drawer */}
      <DiagnosisDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        dogName={dogName}
        scores={scores}
        counts={scores.counts}
      />
    </div>
  );
};

export default DiagnosisScreen;
