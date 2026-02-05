import React from 'react';
import { motion } from 'framer-motion';

export const MilestoneTimeline = ({ milestones }) => {
  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-gray-200" />

      {milestones.map((milestone, idx) => (
        <motion.div
          key={milestone.week}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * idx }}
          className="relative flex items-start gap-4 mb-6 last:mb-0"
        >
          {/* Circle */}
          <div
            className={`absolute -left-8 w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
              idx === 0
                ? 'bg-[#E07B39] text-white shadow-md shadow-[#E07B39]/30'
                : 'bg-gray-100 text-gray-500 border border-gray-200'
            }`}
          >
            {milestone.week}
          </div>

          {/* Content */}
          <div className="pt-1">
            <p className={`text-sm font-semibold ${idx === 0 ? 'text-[#E07B39]' : 'text-gray-700'}`}>
              Week {milestone.week}: {milestone.title}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{milestone.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MilestoneTimeline;
