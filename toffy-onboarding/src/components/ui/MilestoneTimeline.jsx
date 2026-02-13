import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export const MilestoneTimeline = ({ milestones }) => {
  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-gray-200" />

      {milestones.map((milestone, idx) => {
        const isWeek1 = idx === 0;
        const isLocked = idx > 0;

        return (
          <motion.div
            key={milestone.week}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="relative flex items-start gap-4 mb-6 last:mb-0"
          >
            {/* Circle with glow for Week 1 */}
            <div className="absolute -left-8 w-[30px] h-[30px] shrink-0 z-10">
              {isWeek1 ? (
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(224, 123, 57, 0.4)',
                      '0 0 0 8px rgba(224, 123, 57, 0)',
                      '0 0 0 0 rgba(224, 123, 57, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="w-full h-full rounded-full bg-[#E07B39] text-white shadow-md shadow-[#E07B39]/30 flex items-center justify-center text-xs font-bold"
                >
                  {milestone.week}
                </motion.div>
              ) : (
                <div className="w-full h-full rounded-full bg-gray-100 text-gray-400 border border-gray-200 flex items-center justify-center text-xs font-bold relative">
                  {milestone.week}
                  {/* Lock icon overlay */}
                  <div className="absolute inset-0 bg-gray-100/90 rounded-full flex items-center justify-center">
                    <Lock className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="pt-1">
              <p className={`text-sm font-semibold ${isWeek1 ? 'text-[#E07B39]' : 'text-gray-400'}`}>
                Week {milestone.week}: {milestone.title}
              </p>
              <p className={`text-xs mt-0.5 ${isWeek1 ? 'text-gray-500' : 'text-gray-400'}`}>
                {milestone.description}
              </p>
              {isLocked && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + 0.1 * idx }}
                  className="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 bg-gray-100 rounded-full"
                >
                  <Lock className="w-2.5 h-2.5 text-gray-400" />
                  <span className="text-[10px] font-medium text-gray-500">Unlocked after Day 7</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MilestoneTimeline;
