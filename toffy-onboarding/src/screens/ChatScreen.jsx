import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, PawPrint, Brain, Sparkles, Cpu } from 'lucide-react';
import { ONBOARDING_FLOW, computeDiagnosisScores, getDiagnosisSplit } from '../data/config';
import { VisualGridPicker } from '../components/ui/VisualGridPicker';
import { SpeedRound } from '../components/ui/SpeedRound';
import { SliderBubble } from '../components/ui/SliderBubble';
import { MultiSelectChips } from '../components/ui/MultiSelectChips';
import { SensitivityMatrix } from '../components/ui/SensitivityMatrix';
import { ThinkingProcess } from '../components/ui/ThinkingProcess';

const NotificationPrompt = ({ step, onComplete }) => {
  const [time, setTime] = useState(step.defaultTime || '19:00');

  const handleAccept = async () => {
    if (typeof Notification !== 'undefined' && Notification.requestPermission) {
      try {
        await Notification.requestPermission();
      } catch (error) {
        // Ignore permission errors; still allow flow to continue
      }
    }
    onComplete({ enabled: true, time }, `Yes, remind me at ${time}`);
  };

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
        <p className="text-sm text-gray-700 mb-3">{step.message}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500">Remind me at</span>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-gray-700"
          />
        </div>
        <div className="space-y-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAccept}
            className="w-full py-2.5 bg-[#E07B39] text-white rounded-xl font-medium text-sm hover:bg-[#C86A2E] transition-colors"
          >
            {step.buttonText}
          </motion.button>

          {step.secondaryButtonText && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => onComplete({ enabled: false, time: null }, step.secondaryButtonText)}
              className="w-full py-2.5 bg-gray-50 text-gray-500 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              {step.secondaryButtonText}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const ChatScreen = ({ onNext, onBack, data, updateData }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [responses, setResponses] = useState({});
  const [thinkingCount, setThinkingCount] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const scrollRef = useRef(null);
  const dogName = data.dogName || 'your dog';

  const currentFlow = ONBOARDING_FLOW[currentStep];

  // Get reactive avatar emoji based on current step
  const getAvatarEmoji = () => {
    if (isThinking) return '⚙️';
    if (!currentFlow) return '🐕';

    // Map step types/ids to expressions
    const stepId = currentFlow.id;
    if (stepId === 'intro') return '👋';
    if (stepId === 'goal') return '🎯';
    if (stepId?.includes('leadership')) return '🤴';
    if (stepId === 'five_things') return '🥗';
    if (stepId?.includes('sensitivities')) return '🛡️';
    if (stepId === 'severity') return '🌡️';
    if (stepId === 'training_time') return '🕒';
    if (currentFlow.type === 'speedround') return '⚡';
    if (currentFlow.type === 'slider') return '📈';
    if (currentFlow.type === 'chips') return '✨';

    return '🐕';
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    // Don't scroll if the user is actively interacting with form elements
    if (!isUserInteracting) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping, isThinking, isUserInteracting]);

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

  const formatList = (items) => {
    if (!items || items.length === 0) return '';
    if (items.length === 1) return items[0];
    return `${items.slice(0, -1).join(', ')} & ${items[items.length - 1]}`;
  };

  const getLeadershipHighlights = (answers = {}) => {
    const flags = [];
    if (answers.table_scraps) flags.push('table treats');
    if (answers.raise_voice) flags.push('raised voice corrections');
    if (answers.leash_pull) flags.push('leash pulling');
    if (!answers.door_wait) flags.push('door manners');
    if (!answers.approach_signal) flags.push('approach signals');
    if (!answers.playtime_signal) flags.push('clear play cues');
    if (flags.length === 0) return 'No red flags — strong leadership signals.';
    return `Pressure points noted: ${formatList(flags)}.`;
  };

  const getEssentialsFocus = (answers = {}) => {
    const gaps = [];
    if (answers.sensory === false) gaps.push('sensory stimulation');
    if (answers.walks === false) gaps.push('regular walks');
    if (answers.training === false) gaps.push('daily training');
    if (answers.diet === false) gaps.push('nutrition check');
    if (answers.bonding === false) gaps.push('bonding time');
    if (gaps.length === 0) {
      return 'Everything covered — locking in enrichment boosts.';
    }
    return `Focusing next on ${formatList(gaps)}.`;
  };

  const getSeverityDescriptor = (value = 50) => {
    if (value <= 25) return 'a mild concern';
    if (value <= 50) return 'a moderate challenge';
    if (value <= 75) return 'an urgent issue';
    return 'a critical situation';
  };

  const generateThinkingSteps = (stepId, value, summary, updatedResponses, index) => {
    switch (stepId) {
      case 'leadership_2':
        return [
          { id: `leadership-${index}-1`, label: 'Leadership & boundary patterns noted.', icon: 'brain' },
        ];
      case 'five_things':
        return [
          { id: `essentials-${index}-1`, label: 'Daily essentials assessed.', icon: 'clipboard' },
        ];
      case 'sensitivities':
        return [
          { id: `sens-${index}-1`, label: 'Reactivity profile mapped.', icon: 'brain' },
        ];
      case 'severity':
        return [
          { id: `severity-${index}-1`, label: 'Plan intensity calibrated.', icon: 'gauge' },
        ];
      default:
        return [
          { id: `default-${index}-1`, label: 'Processing your responses.', icon: 'cpu' },
        ];
    }
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

  const getSummaryData = (chatResponses) => {
    const scores = computeDiagnosisScores(chatResponses);

    const getLevel = (score, inverted) => {
      if (inverted) {
        if (score <= 30) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
        if (score <= 60) return { level: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50' };
        return { level: 'High', color: 'text-red-500', bg: 'bg-red-50' };
      }
      if (score >= 71) return { level: 'Strong', color: 'text-green-600', bg: 'bg-green-50' };
      if (score >= 41) return { level: 'Developing', color: 'text-amber-600', bg: 'bg-amber-50' };
      return { level: 'Needs work', color: 'text-red-500', bg: 'bg-red-50' };
    };

    const areas = [
      { key: 'leadership', name: 'Leadership', icon: '👑', score: scores.leadership, ...getLevel(scores.leadership, false) },
      { key: 'boundaries', name: 'Boundaries', icon: '🚧', score: scores.boundaries, ...getLevel(scores.boundaries, false) },
      { key: 'essentials', name: 'Essentials', icon: '🎯', score: scores.essentials, ...getLevel(scores.essentials, false) },
      { key: 'reactivity', name: 'Reactivity', icon: '⚡', score: scores.reactivity, ...getLevel(scores.reactivity, true) },
    ];

    const weakAreas = [];
    if (scores.leadership < 50) weakAreas.push('leadership');
    if (scores.boundaries < 50) weakAreas.push('boundaries');
    if (scores.essentials < 60) weakAreas.push('essentials');
    if (scores.reactivity > 50) weakAreas.push('reactivity');

    const goalLabels = { potty: 'potty training', leash: 'leash behavior', obedience: 'obedience', behavior: 'behavior issues' };
    const goal = goalLabels[chatResponses.goal] || 'training';

    let narrative;
    if (weakAreas.length === 0) {
      narrative = `${dogName} has a strong foundation. Your plan will fine-tune what's working and target your ${goal} goal.`;
    } else {
      const focus = weakAreas.slice(0, 2).join(' & ');
      narrative = `Your plan will prioritize ${focus} — the areas most connected to your ${goal} goal.`;
    }

    // Split diagnosis for two-message narrative
    const age = chatResponses.age || 'adult';
    const goalKey = chatResponses.goal || 'potty';
    const split = getDiagnosisSplit(dogName, chatResponses, age, goalKey);

    return { areas, narrative, split };
  };

  const showSummaryAndCTA = (chatResponses) => {
    const summaryData = getSummaryData(chatResponses);
    setIsTyping(true);

    // Message 1: Diagnosis with score grid + evidence
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        type: 'diagnosis',
        data: {
          areas: summaryData.areas,
          rootCause: summaryData.split.rootCause,
        },
      }]);

      // Message 2: Consequence + plan connection (staggered)
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          type: 'consequence',
          data: summaryData.split.consequence,
        }]);
      }, 1500);
    }, 1000);
  };

  const handleStepComplete = (stepId, value, displayText) => {
    // Save response and sync to parent
    const newResponses = { ...responses, [stepId]: value };
    setResponses(newResponses);
    const updatePayload = { chatResponses: newResponses };
    if (stepId === 'goal') updatePayload.selectedProblem = value;
    updateData(updatePayload);

    // Add user message
    const processedSummary = displayText ? processText(displayText) : null;

    if (processedSummary) {
      addUserResponse(processedSummary);
    }

    // Resolve acknowledgement: map → dynamic → static
    let ackText = null;
    if (currentFlow?.acknowledgementMap && currentFlow.acknowledgementMap[value]) {
      ackText = currentFlow.acknowledgementMap[value];
    } else if (currentFlow?.dynamicAcknowledgement) {
      ackText = currentFlow.dynamicAcknowledgement(value);
    } else if (currentFlow?.acknowledgement) {
      ackText = currentFlow.acknowledgement;
    }

    const hasAck = !!ackText;
    const ackDelay = hasAck ? 800 : 0;

    // Show acknowledgement if exists
    if (hasAck) {
      setTimeout(() => {
        addAcknowledgement(processText(ackText));
      }, 400);
    }

    // Show credential pill if the step has one
    if (currentFlow?.credential) {
      const credDelay = hasAck ? 1000 : 400;
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'credential', text: currentFlow.credential }]);
      }, credDelay);
    }

    // Determine if we should show "Thinking" process after this answer
    // Only show thinking after major sections that consolidate multiple inputs
    const shouldThink =
      stepId === 'leadership_2' ||  // After completing the leadership section
      stepId === 'five_things' ||  // After completing the 5 things assessment
      stepId === 'sensitivities' ||  // After completing sensitivity assessment
      stepId === 'severity';  // After completing severity assessment
    // Note: notification_reminder does not trigger thinking as it leads directly to completion

    // Move to next step logic
    const proceed = () => {
      const nextStep = currentStep + 1;
      if (nextStep < ONBOARDING_FLOW.length) {
        const nextFlow = ONBOARDING_FLOW[nextStep];
        if (nextFlow.type === 'complete') {
          showSummaryAndCTA(newResponses);
        } else {
          setCurrentStep(nextStep);
          setTimeout(() => showBotMessage(nextFlow), 400);
        }
      } else {
        onNext();
      }
    };

    if (shouldThink) {
      const nextThinkingIndex = thinkingCount + 1;
      const thinkingSteps = generateThinkingSteps(stepId, value, processedSummary, newResponses, nextThinkingIndex);
      setThinkingCount(nextThinkingIndex);
      setTimeout(() => {
        setIsThinking(true);
        setMessages(prev => [...prev, { type: 'thinking', steps: thinkingSteps }]);
      }, 1000 + ackDelay);
    } else {
      setTimeout(proceed, 600 + ackDelay);
    }
  };

  const onThinkingComplete = () => {
    setIsThinking(false);

    // After thinking is complete, move to the next step
    const nextStep = currentStep + 1;
    if (nextStep < ONBOARDING_FLOW.length) {
      const nextFlow = ONBOARDING_FLOW[nextStep];
      if (nextFlow.type === 'complete') {
        showSummaryAndCTA(responses);
      } else {
        setCurrentStep(nextStep);
        setTimeout(() => showBotMessage(nextFlow), 400);
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
              <p className="text-sm text-gray-700 mb-4 whitespace-pre-line">{processText(step.message)}</p>
              <div className="space-y-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStepComplete(step.id, true, step.buttonText)}
                  className="w-full py-2.5 bg-[#E07B39] text-white rounded-xl font-medium text-sm hover:bg-[#C86A2E] transition-colors"
                >
                  {step.buttonText}
                </motion.button>

                {step.secondaryButtonText && (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStepComplete(step.id, false, step.secondaryButtonText)}
                    className="w-full py-2.5 bg-gray-50 text-gray-500 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors"
                  >
                    {step.secondaryButtonText}
                  </motion.button>
                )}
              </div>
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
            onInteractionStart={() => setIsUserInteracting(true)}
            onInteractionEnd={() => setIsUserInteracting(false)}
            onComplete={(values, summary) => {
              const displaySummary = step.summaryTemplate?.(values) || summary;
              handleStepComplete(step.id, values, processText(displaySummary));
            }}
          />
        );

      case 'notification':
        return (
          <NotificationPrompt
            step={step}
            onComplete={(value, summary) => handleStepComplete(step.id, value, summary)}
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
          <p className="text-xs text-gray-500">
            {currentStep <= 2 ? 'Getting to know you' :
              currentStep <= 7 ? 'Behavioral assessment' :
                currentStep <= 11 ? 'Sensitivity check' :
                  'Almost done'}
          </p>
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
            ) : msg.type === 'thinking' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 w-full"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07B39] to-[#C86A2E] flex items-center justify-center text-white shrink-0 shadow-md">
                  <Brain className="w-4 h-4" />
                </div>
                <div className="flex-1 p-4 shadow-sm bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100">
                  <ThinkingProcess steps={msg.steps} onComplete={onThinkingComplete} />
                </div>
              </motion.div>
            ) : msg.type === 'credential' ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <div className="flex items-center gap-2 bg-[#E07B39]/5 border border-[#E07B39]/10 px-3 py-1.5 rounded-full">
                  <div className="w-4 h-4 rounded-full bg-[#E07B39]/20 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-[#E07B39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-[#E07B39]/80 font-medium">{msg.text}</span>
                </div>
              </motion.div>
            ) : msg.type === 'diagnosis' ? (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="flex items-end gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07B39] to-[#C86A2E] flex items-center justify-center text-white shrink-0 shadow-md transform -translate-y-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="max-w-[85%] p-4 shadow-sm bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-100">
                    <p className="text-[11px] font-semibold text-[#E07B39] uppercase tracking-wide mb-2">{dogName}'s Assessment</p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {msg.data.areas.map((area) => (
                        <div key={area.key} className={`${area.bg} rounded-lg p-2 flex items-center gap-2`}>
                          <span className="text-base">{area.icon}</span>
                          <div className="min-w-0">
                            <p className="text-[10px] text-gray-500 leading-none">{area.name}</p>
                            <p className={`text-xs font-semibold ${area.color} leading-tight`}>{area.level}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 pt-2 mt-1">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">How I figured this out</p>
                      {msg.data.rootCause.evidence.length > 0 && (
                        <ul className="space-y-1 mb-2">
                          {msg.data.rootCause.evidence.map((item, i) => (
                            <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                              <span className="text-gray-400 shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="text-sm text-gray-600 leading-relaxed">{msg.data.rootCause.explanation}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : msg.type === 'consequence' ? (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-end gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07B39] to-[#C86A2E] flex items-center justify-center text-white shrink-0 shadow-md transform -translate-y-1">
                    <PawPrint className="w-4 h-4" />
                  </div>
                  <div className="max-w-[85%] p-4 shadow-sm bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">{msg.data.warning}</p>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed mb-3">{msg.data.planConnection}</p>
                    <div className="space-y-1.5">
                      {msg.data.planPreview.map((day, i) => (
                        <div key={i} className="flex items-center gap-2 bg-orange-50/60 rounded-lg px-2.5 py-1.5">
                          <span className="text-[10px] font-bold text-[#E07B39] w-10 shrink-0">{day.label}</span>
                          <span className="text-xs text-gray-700">{day.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onNext}
                  className="w-full py-3.5 bg-[#E07B39] text-white rounded-2xl font-semibold text-sm hover:bg-[#C86A2E] transition-colors shadow-md"
                >
                  View Your Plan →
                </motion.button>
              </motion.div>
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
