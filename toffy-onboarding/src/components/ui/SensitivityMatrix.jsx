import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Check, Volume2, Hand, Zap, UtensilsCrossed, Bone } from 'lucide-react';

// Icon mapping for sensitivity items
const iconMap = {
  food: UtensilsCrossed,
  touch: Hand,
  movement: Zap,
  noise: Volume2,
  possessions: Bone,
};

export const SensitivityMatrix = ({
  question,
  items = [],
  onComplete,
  dogName = ''
}) => {
  const initialValues = {};
  items.forEach(item => {
    initialValues[item.id] = item.defaultValue ?? 20;
  });

  const [values, setValues] = useState(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const displayQuestion = question?.replace(/{name}/g, dogName) || `How does ${dogName} react to these?`;

  const handleSliderChange = (id, newValue) => {
    setValues(prev => ({ ...prev, [id]: newValue }));
  };

  const getValueLabel = (value) => {
    if (value <= 25) return { text: 'Calm', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (value <= 50) return { text: 'Mild', color: 'text-amber-600', bg: 'bg-amber-50' };
    if (value <= 75) return { text: 'Alert', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { text: 'Reactive', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const getSliderColor = (value) => {
    if (value <= 25) return 'from-emerald-400 to-emerald-500';
    if (value <= 50) return 'from-amber-400 to-amber-500';
    if (value <= 75) return 'from-orange-400 to-orange-500';
    return 'from-red-400 to-red-500';
  };

  const getThumbColor = (value) => {
    if (value <= 25) return 'border-emerald-500 shadow-emerald-200';
    if (value <= 50) return 'border-amber-500 shadow-amber-200';
    if (value <= 75) return 'border-orange-500 shadow-orange-200';
    return 'border-red-500 shadow-red-200';
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const reactiveItems = items.filter(item => values[item.id] > 50);
    let summary;
    if (reactiveItems.length === 0) {
      summary = `${dogName} is generally calm in most situations`;
    } else if (reactiveItems.length === 1) {
      summary = `${dogName} shows some reactivity around ${reactiveItems[0].label.toLowerCase()}`;
    } else {
      summary = `${dogName} shows reactivity in ${reactiveItems.length} areas`;
    }
    onComplete?.(values, summary);
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
        <p className="text-sm font-semibold text-gray-800 mb-1">{displayQuestion}</p>
        <p className="text-xs text-gray-400 mb-4">Drag each slider to set sensitivity level</p>

        {/* Sensitivity Items */}
        <div className="space-y-3">
          {items.map((item, index) => {
            const value = values[item.id];
            const label = getValueLabel(value);
            const Icon = iconMap[item.id] || PawPrint;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl p-3"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                  <motion.span
                    key={label.text}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${label.bg} ${label.color}`}
                  >
                    {label.text}
                  </motion.span>
                </div>

                {/* Slider Track */}
                <div className="relative h-6 flex items-center">
                  {/* Background Track */}
                  <div className="absolute inset-x-0 h-2 bg-gray-200 rounded-full" />

                  {/* Filled Track */}
                  <motion.div
                    className={`absolute left-0 h-2 rounded-full bg-gradient-to-r ${getSliderColor(value)}`}
                    animate={{ width: `${value}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />

                  {/* Hidden Input */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={value}
                    onChange={(e) => handleSliderChange(item.id, Number(e.target.value))}
                    disabled={isSubmitted}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                  />

                  {/* Custom Thumb */}
                  <motion.div
                    className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 rounded-full shadow-md pointer-events-none ${getThumbColor(value)}`}
                    style={{ left: `calc(${value}% - 10px)` }}
                    whileHover={{ scale: 1.1 }}
                  />
                </div>

                {/* Scale Markers */}
                <div className="flex justify-between mt-1 px-0.5">
                  <span className="text-[10px] text-gray-400">Calm</span>
                  <span className="text-[10px] text-gray-400">Reactive</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleSubmit}
            className="mt-4 w-full py-3 bg-gradient-to-r from-[#E07B39] to-[#D4692F] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:from-[#D4692F] hover:to-[#C25D23] transition-all active:scale-[0.98] shadow-md shadow-orange-200"
          >
            <Check className="w-4 h-4" />
            Continue
          </motion.button>
        )}

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 py-2 text-center text-xs text-emerald-600 bg-emerald-50 rounded-lg font-medium"
          >
            ✓ Sensitivities recorded
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SensitivityMatrix;
