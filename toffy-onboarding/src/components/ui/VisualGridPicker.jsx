import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';

export const VisualGridPicker = ({
  question,
  options = [],
  columns = 3,
  onSelect,
  dogName = '',
}) => {
  const [selected, setSelected] = useState(null);

  const displayQuestion = question.replace(/{name}/g, dogName);

  const handleSelect = (option) => {
    if (selected) return;
    setSelected(option.value);
    setTimeout(() => {
      onSelect?.(option.value, option.label);
    }, 200);
  };

  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns] || 'grid-cols-3';

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
        <p className="text-sm font-medium text-gray-700 mb-4">{displayQuestion}</p>

        <div className={`grid ${gridColsClass} gap-2`}>
          {options.map((option, index) => {
            const isSelected = selected === option.value;

            return (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: isSelected ? 1.02 : 1 }}
                whileTap={!selected ? { scale: 0.95 } : undefined}
                whileHover={!selected ? { scale: 1.02 } : undefined}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
                className={`
                  relative flex flex-col items-center justify-center p-3 rounded-xl
                  transition-colors duration-200 min-h-[80px]
                  ${isSelected
                    ? 'bg-[#E07B39] text-white shadow-lg shadow-[#E07B39]/30'
                    : selected
                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-50 text-gray-700 hover:bg-orange-50 hover:border-[#E07B39]'
                  }
                  border-2 ${isSelected ? 'border-[#E07B39]' : 'border-transparent'}
                `}
              >
                <motion.span
                  className="text-2xl mb-1"
                  animate={isSelected ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {option.emoji}
                </motion.span>
                <span className={`text-xs font-medium text-center leading-tight ${isSelected ? 'text-white' : ''}`}>
                  {option.label}
                </span>
                {option.sublabel && (
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                    {option.sublabel}
                  </span>
                )}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md"
                  >
                    <svg className="w-3 h-3 text-[#E07B39]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {!selected && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-gray-400 text-center mt-3"
          >
            Tap to select
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default VisualGridPicker;
