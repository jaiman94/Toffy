import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Check } from 'lucide-react';

export const MultiSelectChips = ({
  question,
  options = [],
  minSelect = 0,
  maxSelect = null,
  onComplete,
  dogName = '',
  allowNone = false,
}) => {
  const [selected, setSelected] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const displayQuestion = question.replace(/{name}/g, dogName);

  // Dynamic helper text based on selection
  const getHelperText = () => {
    const realSelected = selected.filter(s => s !== 'none').length;
    if (realSelected === 0 && minSelect > 0) {
      return `Pick at least ${minSelect}`;
    }
    if (realSelected > 0 && realSelected < minSelect) {
      const remaining = minSelect - realSelected;
      return `Pick ${remaining} more`;
    }
    if (realSelected >= minSelect && realSelected > 0) {
      return 'Great choices! ✓';
    }
    return 'Select all that apply';
  };

  const toggleOption = (optionValue) => {
    if (isSubmitted) return;

    if (allowNone && optionValue === 'none') {
      setSelected(selected.includes('none') ? [] : ['none']);
      return;
    }

    const currentSelection = selected.filter(s => s !== 'none');

    if (currentSelection.includes(optionValue)) {
      setSelected(currentSelection.filter(s => s !== optionValue));
    } else {
      if (maxSelect && currentSelection.length >= maxSelect) return;
      setSelected([...currentSelection, optionValue]);
    }
  };

  const canSubmit = selected.length >= minSelect;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setIsSubmitted(true);
    onComplete?.(selected);
  };

  const allOptions = allowNone
    ? [...options, { value: 'none', label: 'None' }]
    : options;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="flex items-end gap-3 w-full"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07B39] to-[#C86A2E] flex items-center justify-center text-white shrink-0 shadow-md transform -translate-y-1">
        <PawPrint className="w-4 h-4" />
      </div>

      <div className="max-w-[85%] p-4 shadow-sm bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-1">{displayQuestion}</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={getHelperText()}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className={`text-xs mb-3 ${
              canSubmit && selected.length > 0 ? 'text-green-600 font-medium' : 'text-gray-400'
            }`}
          >
            {getHelperText()}
          </motion.p>
        </AnimatePresence>

        <div className="flex flex-wrap gap-2">
          {allOptions.map((option, index) => {
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            const isSelected = selected.includes(optionValue);

            return (
              <motion.button
                key={optionValue}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleOption(optionValue)}
                disabled={isSubmitted}
                className={`
                  px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  flex items-center gap-1.5
                  ${isSelected
                    ? 'bg-[#E07B39] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                  ${isSubmitted ? 'cursor-not-allowed opacity-75' : 'active:scale-95'}
                `}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                {optionLabel}
              </motion.button>
            );
          })}
        </div>

        {!isSubmitted && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: canSubmit ? 1 : 0.5, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`
              mt-4 w-full py-2.5 rounded-xl font-medium text-sm
              flex items-center justify-center gap-2 transition-all
              ${canSubmit
                ? 'bg-[#E07B39] text-white hover:bg-[#C86A2E] active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <Check className="w-4 h-4" />
            Done
          </motion.button>
        )}

        {isSubmitted && selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-center text-xs text-gray-400"
          >
            Selected: {selected.length} {selected.length === 1 ? 'item' : 'items'}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MultiSelectChips;
