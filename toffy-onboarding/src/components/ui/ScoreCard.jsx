import React from 'react';
import { motion } from 'framer-motion';

const getColor = (score, inverted) => {
  const effective = inverted ? score : score;
  if (inverted) {
    if (score <= 30) return { bg: 'bg-green-100', fill: 'bg-green-500', text: 'text-green-700' };
    if (score <= 60) return { bg: 'bg-amber-100', fill: 'bg-amber-500', text: 'text-amber-700' };
    return { bg: 'bg-red-100', fill: 'bg-red-500', text: 'text-red-700' };
  }
  if (effective >= 71) return { bg: 'bg-green-100', fill: 'bg-green-500', text: 'text-green-700' };
  if (effective >= 41) return { bg: 'bg-amber-100', fill: 'bg-amber-500', text: 'text-amber-700' };
  return { bg: 'bg-red-100', fill: 'bg-red-500', text: 'text-red-700' };
};

export const ScoreCard = ({ label, score, icon, invertedScale = false, delay = 0 }) => {
  const colors = getColor(score, invertedScale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className={`text-2xl font-bold ${colors.text}`}>{score}%</span>
      </div>
      <div className={`w-full h-2 rounded-full ${colors.bg}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${colors.fill}`}
        />
      </div>
    </motion.div>
  );
};

export default ScoreCard;
