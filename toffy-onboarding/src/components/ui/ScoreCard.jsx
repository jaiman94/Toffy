import React from 'react';
import { motion } from 'framer-motion';

const getColor = (score, inverted) => {
  if (inverted) {
    if (score <= 30) return { bg: 'bg-green-100', fill: 'bg-green-500', text: 'text-green-700', label: 'Low reactivity' };
    if (score <= 60) return { bg: 'bg-amber-100', fill: 'bg-amber-500', text: 'text-amber-700', label: 'Moderate reactivity' };
    return { bg: 'bg-red-100', fill: 'bg-red-500', text: 'text-red-700', label: 'High reactivity' };
  }
  if (score >= 71) return { bg: 'bg-green-100', fill: 'bg-green-500', text: 'text-green-700', label: 'Solid foundation' };
  if (score >= 41) return { bg: 'bg-amber-100', fill: 'bg-amber-500', text: 'text-amber-700', label: 'Needs structure' };
  return { bg: 'bg-red-100', fill: 'bg-red-500', text: 'text-red-700', label: 'Needs attention' };
};

export const ScoreCard = ({ label, score, icon, invertedScale = false, delay = 0, count }) => {
  const colors = getColor(score, invertedScale);

  // For reactivity, we show percentage. For others, we show count if available.
  const showCount = count && !invertedScale;
  const healthyPercentRange = invertedScale ? '0-30%' : '70-100%';
  const healthyCountMin = showCount ? Math.max(1, Math.ceil(count.total * 0.7)) : null;
  const healthyCountRange = showCount ? `${healthyCountMin}-${count.total} of ${count.total}` : null;

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
      <div className="flex flex-col gap-1 mb-2">
        {showCount ? (
          <>
            <span className={`text-2xl font-bold ${colors.text}`}>
              {count.positive} of {count.total}
            </span>
            <span className="text-[11px] text-gray-500">Healthy range: {healthyCountRange}</span>
            <span className={`text-xs ${colors.text} font-medium`}>{colors.label}</span>
          </>
        ) : (
          <>
            <span className={`text-2xl font-bold ${colors.text}`}>{score}%</span>
            <span className="text-[11px] text-gray-500">Healthy range: {healthyPercentRange}</span>
            <span className={`text-xs ${colors.text} font-medium`}>{colors.label}</span>
          </>
        )}
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
