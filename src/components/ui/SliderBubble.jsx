import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Check } from 'lucide-react';

export const SliderBubble = ({
  question,
  leftLabel = 'Low',
  rightLabel = 'High',
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onComplete,
  dogName = ''
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Replace {name} placeholder in question
  const displayQuestion = question.replace(/{name}/g, dogName);

  // Calculate percentage for visual fill
  const percentage = ((value - min) / (max - min)) * 100;

  // Generate label based on position
  const getValueLabel = () => {
    if (percentage <= 20) return leftLabel;
    if (percentage <= 40) return `Somewhat ${leftLabel.toLowerCase()}`;
    if (percentage <= 60) return 'Moderate';
    if (percentage <= 80) return `Somewhat ${rightLabel.toLowerCase()}`;
    return rightLabel;
  };

  // Get emoji based on slider position (morphing emoji)
  const getEmojiForValue = () => {
    if (percentage <= 25) return '😌';
    if (percentage <= 50) return '😐';
    if (percentage <= 75) return '😟';
    return '😱';
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onComplete?.(value, getValueLabel());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="flex items-end gap-3 w-full"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07B39] to-[#C86A2E] flex items-center justify-center text-white shrink-0 shadow-md transform -translate-y-1">
        <PawPrint className="w-4 h-4" />
      </div>

      {/* Bubble */}
      <div className="max-w-[85%] p-4 shadow-sm bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-100">
        {/* Question */}
        <p className="text-sm font-medium text-gray-700 mb-4">{displayQuestion}</p>

        {/* Slider Container */}
        <div className="space-y-3">
          {/* Labels */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>{leftLabel}</span>
            <span>{rightLabel}</span>
          </div>

          {/* Custom Slider */}
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E07B39] to-[#C86A2E] rounded-full"
                initial={{ width: '50%' }}
                animate={{ width: `${percentage}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              disabled={isSubmitted}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            {/* Thumb indicator */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-[#E07B39] rounded-full shadow-md pointer-events-none"
              style={{ left: `calc(${percentage}% - 10px)` }}
              animate={{ scale: isSubmitted ? 0.9 : 1 }}
            />
          </div>

          {/* Current Value Label with Morphing Emoji */}
          <div className="text-center flex items-center justify-center gap-2">
            <motion.span
              key={getEmojiForValue()}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="text-xl"
            >
              {getEmojiForValue()}
            </motion.span>
            <span className="text-sm font-medium text-[#E07B39]">{getValueLabel()}</span>
          </div>
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleSubmit}
            className="mt-4 w-full py-2.5 bg-[#E07B39] text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#C86A2E] transition-colors active:scale-[0.98]"
          >
            <Check className="w-4 h-4" />
            Set
          </motion.button>
        )}

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-center text-xs text-gray-400"
          >
            Selected: {getValueLabel()}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SliderBubble;
