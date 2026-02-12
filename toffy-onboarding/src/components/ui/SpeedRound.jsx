import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Check } from 'lucide-react';

export const SpeedRound = ({
  title = "Quick yes/no round:",
  questions = [],
  onComplete,
  dogName = '',
}) => {
  const [answers, setAnswers] = useState(
    questions.reduce((acc, q) => ({ ...acc, [q.id]: null }), {})
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const processQuestion = (text) => text.replace(/{name}/g, dogName);

  const setAnswer = (questionId, value) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const allAnswered = Object.values(answers).every(a => a !== null);

  const handleSubmit = () => {
    if (!allAnswered) return;
    setIsSubmitted(true);
    onComplete?.(answers);
  };

  const yesCount = Object.values(answers).filter(a => a === true).length;

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
        <p className="text-sm font-medium text-gray-700 mb-4">{processQuestion(title)}</p>

        <div className="space-y-3">
          {questions.map((q, index) => {
            const answer = answers[q.id];

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between gap-3"
              >
                <span className={`text-sm flex-1 ${answer !== null ? 'text-gray-500' : 'text-gray-700'}`}>
                  {processQuestion(q.question)}
                </span>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => setAnswer(q.id, true)}
                    disabled={isSubmitted}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                      ${answer === true
                        ? 'bg-[#E07B39] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-[#E07B39]'
                      }
                      ${isSubmitted ? 'cursor-not-allowed' : 'active:scale-95'}
                    `}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setAnswer(q.id, false)}
                    disabled={isSubmitted}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                      ${answer === false
                        ? 'bg-gray-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }
                      ${isSubmitted ? 'cursor-not-allowed' : 'active:scale-95'}
                    `}
                  >
                    No
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {!isSubmitted && (
          <div className="mt-4 mb-2">
            <div className="flex justify-between text-xs mb-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={Object.values(answers).filter(a => a !== null).length}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={allAnswered ? 'text-green-600 font-medium' : 'text-gray-400'}
                >
                  {allAnswered ? 'All done! ✓' : `Question ${Object.values(answers).filter(a => a !== null).length + 1} of ${questions.length}`}
                </motion.span>
              </AnimatePresence>
              <span className="text-gray-400">{Object.values(answers).filter(a => a !== null).length}/{questions.length}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E07B39] to-[#C86A2E] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(Object.values(answers).filter(a => a !== null).length / questions.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>
        )}

        {!isSubmitted && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: allAnswered ? 1 : 0.5, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`
              mt-3 w-full py-2.5 rounded-xl font-medium text-sm
              flex items-center justify-center gap-2 transition-all
              ${allAnswered
                ? 'bg-[#E07B39] text-white hover:bg-[#C86A2E] active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <Check className="w-4 h-4" />
            Done
          </motion.button>
        )}

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-center text-xs text-gray-400"
          >
            {yesCount} of {questions.length} answered "Yes"
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SpeedRound;
