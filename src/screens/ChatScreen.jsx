import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, PawPrint } from 'lucide-react';
import { ONBOARDING_FLOW } from '../data/config';
import { VisualGridPicker } from '../components/ui/VisualGridPicker';
import { SpeedRound } from '../components/ui/SpeedRound';
import { SliderBubble } from '../components/ui/SliderBubble';
import { MultiSelectChips } from '../components/ui/MultiSelectChips';
import { SensitivityMatrix } from '../components/ui/SensitivityMatrix';

export const ChatScreen = ({ onNext, onBack, data }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [responses, setResponses] = useState({});
  const scrollRef = useRef(null);
  const dogName = data.dogName || 'your dog';

  const currentFlow = ONBOARDING_FLOW[currentStep];

  // Get reactive avatar emoji based on current step
  const getAvatarEmoji = () => {
    if (!currentFlow) return '🐕';

    // Map step types/ids to expressions
    const stepId = currentFlow.id;
    if (stepId === 'intro') return '👋';
    if (stepId === 'goal') return '🎯';
    if (stepId?.includes('leadership')) return '🧠';
    if (stepId === 'five_things') return '📋';
    if (stepId?.includes('sensitivities')) return '🤔';
    if (stepId === 'severity') return '📊';
    if (stepId === 'training_time') return '⏱️';
    if (currentFlow.type === 'speedround') return '⚡';
    if (currentFlow.type === 'slider') return '🎚️';
    if (currentFlow.type === 'chips') return '✨';

    return '🐕';
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isTyping]);

  // Show initial message on mount (with ref to prevent StrictMode double-render)
  const initialMessageShown = useRef(false);
  useEffect(() => {
    if (!initialMessageShown.current && messages.length === 0 && currentFlow) {
      initialMessageShown.current = true;
      showBotMessage(currentFlow);
    }
  }, []);

  const processText = (text) => {
    return text
      .replace(/{name}/g, dogName)
      .replace(/{dogName}/g, dogName);
  };

  const showBotMessage = (step) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', step }]);
    }, 800);
  };

  const addUserResponse = (text) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
  };

  const addAcknowledgement = (text) => {
    setMessages(prev => [...prev, { type: 'acknowledgement', text }]);
  };

  const handleStepComplete = (stepId, value, displayText) => {
    // Save response
    setResponses(prev => ({ ...prev, [stepId]: value }));

    // Add user message
    if (displayText) {
      addUserResponse(processText(displayText));
    }

    // Check for acknowledgement on current step
    const hasAck = currentFlow?.acknowledgement;
    const ackDelay = hasAck ? 800 : 0;

    // Show acknowledgement if exists
    if (hasAck) {
      setTimeout(() => {
        addAcknowledgement(processText(currentFlow.acknowledgement));
      }, 400);
    }

    // Move to next step
    const nextStep = currentStep + 1;
    if (nextStep < ONBOARDING_FLOW.length) {
      const nextFlow = ONBOARDING_FLOW[nextStep];
      if (nextFlow.type === 'complete') {
        // Show completion message then navigate
        setTimeout(() => {
          addUserResponse("Let's see my plan!");
          setTimeout(() => {
            onNext();
          }, 1000);
        }, 500 + ackDelay);
      } else {
        setCurrentStep(nextStep);
        setTimeout(() => showBotMessage(nextFlow), 300 + ackDelay);
      }
    } else {
      onNext();
    }
  };

  const renderWidget = (step) => {
    switch (step.type) {
      case 'intro':
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
              <p className="text-sm text-gray-700 mb-4">{processText(step.message)}</p>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStepComplete(step.id, true, step.buttonText)}
                className="w-full py-2.5 bg-[#E07B39] text-white rounded-xl font-medium text-sm hover:bg-[#C86A2E] transition-colors"
              >
                {step.buttonText}
              </motion.button>
            </div>
          </motion.div>
        );

      case 'grid':
        return (
          <VisualGridPicker
            question={step.question}
            options={step.options}
            columns={step.columns}
            dogName={dogName}
            onSelect={(value, label) => {
              const summary = step.summaryTemplate?.(value, label) || label;
              handleStepComplete(step.id, value, summary);
            }}
          />
        );

      case 'speedround':
        return (
          <SpeedRound
            title={step.title}
            questions={step.questions}
            dogName={dogName}
            onComplete={(answers) => {
              const summary = step.summaryTemplate?.(answers) || 'Answered all questions';
              handleStepComplete(step.id, answers, processText(summary));
            }}
          />
        );

      case 'slider':
        return (
          <SliderBubble
            question={step.question}
            leftLabel={step.leftLabel}
            rightLabel={step.rightLabel}
            min={step.min}
            max={step.max}
            defaultValue={step.defaultValue}
            dogName={dogName}
            onComplete={(value, label) => {
              const summary = step.summaryTemplate?.(value, label) || label;
              handleStepComplete(step.id, value, processText(summary));
            }}
          />
        );

      case 'chips':
        return (
          <MultiSelectChips
            question={step.question}
            options={step.options}
            minSelect={step.minSelect || 0}
            allowNone={step.allowNone}
            dogName={dogName}
            onComplete={(selected) => {
              const summary = step.summaryTemplate?.(selected) || selected.join(', ');
              handleStepComplete(step.id, selected, processText(summary));
            }}
          />
        );

      case 'matrix':
        return (
          <SensitivityMatrix
            question={step.question}
            items={step.items}
            dogName={dogName}
            onComplete={(values, summary) => {
              const displaySummary = step.summaryTemplate?.(values) || summary;
              handleStepComplete(step.id, values, processText(displaySummary));
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-bg-cream flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </motion.button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E07B39] to-[#C86A2E] flex items-center justify-center shadow-md overflow-hidden">
          <motion.span
            key={getAvatarEmoji()}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="text-lg"
          >
            {getAvatarEmoji()}
          </motion.span>
        </div>

        <div>
          <h1 className="text-base font-semibold text-gray-800">Toffy AI</h1>
          <p className="text-xs text-gray-500">Your training buddy</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.type === 'bot' ? (
              renderWidget(msg.step)
            ) : msg.type === 'acknowledgement' ? (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex items-end gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07B39] to-[#C86A2E] flex items-center justify-center text-white shrink-0 shadow-md transform -translate-y-1">
                  <PawPrint className="w-4 h-4" />
                </div>
                <div className="max-w-[85%] px-4 py-3 shadow-sm bg-white text-gray-700 rounded-2xl rounded-bl-none border border-gray-100">
                  <p className="text-sm">{msg.text}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-end"
              >
                <div className="max-w-[80%] p-4 shadow-sm bg-gradient-to-br from-[#E07B39] to-[#C86A2E] text-white rounded-2xl rounded-br-none">
                  <p className="text-sm">{msg.text}</p>
                </div>
              </motion.div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-end gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07B39] to-[#C86A2E] flex items-center justify-center text-white shrink-0 shadow-md">
                <PawPrint className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 bg-white rounded-2xl rounded-bl-none border border-gray-100 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatScreen;
