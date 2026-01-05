import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Lock,
  Home,
  Dumbbell,
  BarChart2,
  MessageCircle,
  User,
  Lightbulb,
  ChevronDown,
  Eye,
  EyeOff,
  PawPrint,
  Clock,
  BookOpen,
  Sparkles,
  CheckCircle,
  Circle,
  Search,
  X,
} from 'lucide-react';

import { BREEDS, AGES, PROBLEMS, QUESTIONS_BY_PROBLEM, GENERATION_STEPS, getPlanDays } from './data/config';
import api from './services/api';
import './index.css';

// ============================================
// DESIGN TOKENS
// ============================================
const COLORS = {
  primary: '#E07B39',
  primaryHover: '#C86A2E',
  bgCream: '#FDF6F0',
  bgOrange: '#F5DCC7',
  text: '#333333',
  textMuted: '#666666',
  textLight: '#999999',
  success: '#2E5A4C',
  successLight: '#E8F5E9',
  border: '#E5E5E5',
  white: '#FFFFFF',
};

// ============================================
// REUSABLE COMPONENTS
// ============================================

const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '', ...props }) => {
  const baseStyles = "font-semibold py-4 px-8 rounded-full w-full transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]";

  const variants = {
    primary: `text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`,
    outline: `bg-white border-2 border-[${COLORS.primary}] text-[${COLORS.primary}]`,
    ghost: `bg-transparent text-[${COLORS.primary}] hover:bg-[${COLORS.bgCream}]`,
    social: `bg-white border border-gray-200 text-[${COLORS.text}] hover:bg-gray-50 shadow-sm`,
    apple: `bg-black text-white hover:bg-gray-900`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={variant === 'primary' ? { backgroundColor: COLORS.primary } : {}}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ label, type = 'text', placeholder, value, onChange, icon, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="mb-4 w-full">
      {label && <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>}
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white border rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#E07B39]/20 focus:border-[#E07B39] text-[#333] transition-all ${error ? 'border-red-400' : 'border-gray-200'}`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        {icon && type !== 'password' && (
          <div className="absolute right-4 top-3.5 text-gray-400">{icon}</div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

const Select = ({ label, value, onChange, options, placeholder = 'Select...', searchable = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  const filteredOptions = searchable && search
    ? options.filter(opt => {
        const optLabel = typeof opt === 'object' ? opt.label : opt;
        return optLabel.toLowerCase().includes(search.toLowerCase());
      })
    : options;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDisplayLabel = () => {
    if (!value) return null;
    const found = options.find(o => (typeof o === 'object' ? o.value : o) === value);
    return typeof found === 'object' ? found?.label : found;
  };

  const displayLabel = getDisplayLabel();

  return (
    <div className="mb-4 w-full" ref={ref}>
      {label && <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-left flex items-center justify-between focus:ring-2 focus:ring-[#E07B39]/20 focus:border-[#E07B39] transition-all"
        >
          <span className={displayLabel ? 'text-[#333]' : 'text-gray-400'}>
            {displayLabel || placeholder}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              {searchable && (
                <div className="p-2 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#E07B39]"
                      autoFocus
                    />
                  </div>
                </div>
              )}
              <div className="max-h-48 overflow-y-auto">
                {filteredOptions.map((opt, idx) => {
                  const optValue = typeof opt === 'object' ? opt.value : opt;
                  const optLabel = typeof opt === 'object' ? opt.label : opt;
                  const isSelected = value === optValue;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        onChange({ target: { value: optValue } });
                        setIsOpen(false);
                        setSearch('');
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-[#FDF6F0] transition-colors flex items-center justify-between ${isSelected ? 'bg-[#FDF6F0] text-[#E07B39]' : 'text-[#333]'}`}
                    >
                      {optLabel}
                      {isSelected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
                {filteredOptions.length === 0 && (
                  <p className="px-4 py-3 text-gray-400 text-sm">No results found</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProgressBar = ({ current, total, label }) => (
  <div className="w-full">
    {label && (
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[#333]">{label}</span>
        <span className="text-xs font-bold text-[#E07B39]">{current}/{total}</span>
      </div>
    )}
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-[#E07B39] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(current / total) * 100}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  </div>
);

const ChatBubble = ({ isUser, children, animate = true }) => {
  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.3 },
  } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`flex ${isUser ? 'justify-end' : 'items-end gap-2'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#E07B39] flex items-center justify-center text-white shrink-0 shadow-sm">
          <PawPrint className="w-4 h-4" />
        </div>
      )}
      <div
        className={`max-w-[85%] p-3.5 ${isUser
          ? 'bg-[#E07B39] text-white rounded-2xl rounded-br-sm shadow-md'
          : 'bg-white text-[#333] rounded-2xl rounded-bl-sm shadow-sm border border-gray-100'
        }`}
      >
        {children}
      </div>
    </Wrapper>
  );
};

const TypingIndicator = () => (
  <div className="flex items-end gap-2">
    <div className="w-8 h-8 rounded-full bg-[#E07B39] flex items-center justify-center text-white shrink-0 shadow-sm">
      <PawPrint className="w-4 h-4" />
    </div>
    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
      </div>
    </div>
  </div>
);

// ============================================
// SCREEN COMPONENTS
// ============================================

// Screen 1: Welcome
const WelcomeScreen = ({ onNext }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col h-full justify-between p-6 pt-12"
  >
    <div className="flex flex-col items-center">
      {/* Logo */}
      <div className="mb-6">
        <h1 className="text-5xl font-bold tracking-tight text-[#333]">
          t<span className="inline-block text-[#E07B39]">🐾</span>ffy
        </h1>
      </div>

      {/* Value Prop */}
      <h2 className="text-2xl font-bold text-[#333] text-center leading-tight mb-3">
        Expert dog training,<br />powered by AI
      </h2>
      <p className="text-gray-500 text-center mb-2 max-w-xs">
        Personalized plans built by certified behaviorists
      </p>

      {/* Social Proof */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex -space-x-2">
          {['🐕', '🐩', '🦮'].map((dog, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-[#F5DCC7] flex items-center justify-center border-2 border-white text-sm">
              {dog}
            </div>
          ))}
        </div>
        <span className="text-sm text-gray-500">50,000+ dogs trained</span>
      </div>

      {/* Mascot */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-64 h-64 rounded-full bg-gradient-to-b from-[#FDF6F0] to-[#F5DCC7] flex items-center justify-center mb-8 shadow-inner relative overflow-hidden"
      >
        <span className="text-[100px] transform translate-y-2">🐕</span>
        <Sparkles className="absolute top-8 right-8 text-yellow-400 w-6 h-6 animate-pulse" />
      </motion.div>
    </div>

    <div className="space-y-4">
      <Button onClick={onNext}>Get Started Free</Button>
      <button className="w-full text-center text-[#E07B39] font-semibold py-2 hover:underline">
        Already have an account? Log In
      </button>
    </div>
  </motion.div>
);

// Screen 2: Pet Profile (Simplified - Delayed Auth)
const PetProfileScreen = ({ onNext, onBack, data, updateData }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    updateData({ [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const validate = () => {
    const newErrors = {};
    if (!data.dogName?.trim()) newErrors.dogName = 'Required';
    if (!data.breed) newErrors.breed = 'Required';
    if (!data.age) newErrors.age = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      api.pet.create(data);
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full p-6"
    >
      <button onClick={onBack} className="mb-6 text-[#333] hover:text-[#E07B39] self-start">
        <ArrowLeft />
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#333] mb-2">Tell us about your pup</h2>
        <p className="text-gray-500 text-sm">Just a few quick details to personalize your plan</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1">
        <Input
          label="What's your dog's name?"
          placeholder="e.g., Max"
          value={data.dogName || ''}
          onChange={handleChange('dogName')}
          error={errors.dogName}
        />

        <Select
          label="Breed"
          value={data.breed}
          onChange={handleChange('breed')}
          options={BREEDS}
          placeholder="Select breed..."
          searchable
        />

        <Select
          label="Age"
          value={data.age}
          onChange={handleChange('age')}
          options={AGES}
          placeholder="Select age..."
        />
      </div>

      <div className="pt-4">
        <Button onClick={handleContinue} disabled={!data.dogName}>
          Continue
        </Button>
        <p className="text-xs text-center text-gray-400 mt-3">
          No account needed yet — we'll ask later
        </p>
      </div>
    </motion.div>
  );
};

// Quick Reply Chips Component
const QuickReplies = ({ options, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-wrap gap-2 pl-10"
  >
    {options.map((opt, i) => (
      <motion.button
        key={opt}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.05 }}
        onClick={() => onSelect(opt)}
        className="px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-[#333] font-medium hover:border-[#E07B39] hover:text-[#E07B39] active:scale-95 transition-all shadow-sm"
      >
        {opt}
      </motion.button>
    ))}
  </motion.div>
);

// Screen 3: Unified Chat (Problem Selection + Questions)
const ChatScreen = ({ onNext, onBack, data, updateData }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingUI, setPendingUI] = useState(null); // 'problem-grid' | { type: 'options', options: [] } | null
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const scrollRef = useRef(null);

  // Helper to add messages
  const addBotMessage = useCallback((text) => {
    setMessages(prev => [...prev, { type: 'bot', text }]);
  }, []);

  const addUserMessage = useCallback((text) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, pendingUI]);

  // Helper for delays
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Initial chat sequence (with cleanup to prevent double-run in StrictMode)
  useEffect(() => {
    let cancelled = false;

    const initChat = async () => {
      await delay(500);
      if (cancelled) return;
      addBotMessage(`Hi! I'm Toffy 👋 Nice to meet ${data.dogName || 'your pup'}!`);

      setIsTyping(true);
      await delay(1200);
      if (cancelled) return;
      setIsTyping(false);

      addBotMessage("I'm an AI trainer built with knowledge from certified behaviorists. What's the main thing you'd like help with?");

      await delay(400);
      if (cancelled) return;
      setPendingUI('problem-grid');
    };
    initChat();

    return () => { cancelled = true; };
  }, []);

  // Handle problem selection
  const handleProblemSelect = async (problem) => {
    setSelectedProblem(problem);
    setPendingUI(null);
    updateData({ selectedProblem: problem.id });

    // User's selection as message
    addUserMessage(`${problem.emoji} ${problem.label}`);

    // Empathy response
    setIsTyping(true);
    await delay(1200);
    setIsTyping(false);
    addBotMessage(problem.empathy);

    // Transition to questions
    setIsTyping(true);
    await delay(1000);
    setIsTyping(false);
    addBotMessage(`Let me ask a few quick questions to personalize ${data.dogName}'s plan.`);

    await delay(600);
    askQuestion(0, problem.id);
  };

  // Ask a question
  const askQuestion = async (index, problemId) => {
    const questions = QUESTIONS_BY_PROBLEM[problemId] || QUESTIONS_BY_PROBLEM.obedience;

    if (index >= questions.length) {
      // Done with questions - wrap up
      setIsTyping(true);
      await delay(1000);
      setIsTyping(false);
      addBotMessage(`Perfect! I have everything I need to create ${data.dogName}'s personalized training plan. 🎉`);

      await delay(1500);
      api.onboarding.submitAssessment('pet_1', answers);
      onNext();
      return;
    }

    setCurrentQuestionIndex(index);

    setIsTyping(true);
    await delay(900);
    setIsTyping(false);

    const question = questions[index];
    const questionText = question.question.replace('{dogName}', data.dogName);
    addBotMessage(questionText);

    await delay(300);
    setPendingUI({ type: 'options', options: question.options });
  };

  // Handle answer selection
  const handleAnswerSelect = async (option) => {
    setPendingUI(null);
    addUserMessage(option);
    setAnswers(prev => [...prev, option]);

    await delay(400);
    askQuestion(currentQuestionIndex + 1, selectedProblem.id);
  };

  // Progress indicator (only show during questions)
  const questions = selectedProblem ? (QUESTIONS_BY_PROBLEM[selectedProblem.id] || []) : [];
  const showProgress = currentQuestionIndex >= 0 && questions.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="text-[#333] hover:text-[#E07B39]">
          <ArrowLeft />
        </button>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[#333]">Toffy AI</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[10px] text-gray-500">Online</span>
          </div>
        </div>
        <div className="w-6" />
      </div>

      {/* Progress Bar (during questions) */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-b border-gray-100 px-4 py-2"
          >
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>{data.dogName}'s {selectedProblem?.label} Plan</span>
              <span className="font-bold text-[#E07B39]">{currentQuestionIndex + 1}/{questions.length}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#E07B39] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} isUser={msg.type === 'user'}>
            <p className="text-sm leading-relaxed">{msg.text}</p>
          </ChatBubble>
        ))}

        {isTyping && <TypingIndicator />}

        {/* Problem Grid */}
        <AnimatePresence>
          {pendingUI === 'problem-grid' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="pl-10 grid grid-cols-2 gap-2"
            >
              {PROBLEMS.map((problem) => (
                <motion.button
                  key={problem.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleProblemSelect(problem)}
                  className="bg-white p-3 rounded-xl border border-gray-200 text-left hover:border-[#E07B39] hover:shadow-md transition-all"
                >
                  <div className="text-2xl mb-1">{problem.emoji}</div>
                  <div className="font-semibold text-xs text-[#333]">{problem.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{problem.sublabel}</div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Reply Options */}
        <AnimatePresence>
          {pendingUI?.type === 'options' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <QuickReplies
                options={pendingUI.options}
                onSelect={handleAnswerSelect}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer for scroll */}
        <div className="h-4" />
      </div>
    </motion.div>
  );
};

// Screen 4: Generation Animation
const GenerationScreen = ({ onNext, data }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const steps = GENERATION_STEPS.length;
    const stepDuration = 1000;

    const timers = [];
    for (let i = 1; i <= steps; i++) {
      timers.push(setTimeout(() => setCurrentStep(i), i * stepDuration));
    }
    timers.push(setTimeout(() => onNext(), (steps + 0.5) * stepDuration));

    return () => timers.forEach(clearTimeout);
  }, [onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-[#FDF6F0] items-center justify-center p-8"
    >
      {/* Animated Mascot */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-28 h-28 bg-gradient-to-b from-[#F5DCC7] to-[#E07B39] rounded-full flex items-center justify-center shadow-xl mb-10"
      >
        <span className="text-6xl">🐕</span>
      </motion.div>

      <h2 className="text-xl font-bold text-[#333] text-center mb-10">
        Creating {data.dogName}'s plan...
      </h2>

      {/* Checklist */}
      <div className="w-full max-w-xs space-y-5 bg-white p-6 rounded-2xl shadow-sm">
        {GENERATION_STEPS.map((step, idx) => {
          const isActive = currentStep === idx;
          const isComplete = currentStep > idx;
          const label = step.label.replace('{dogName}', data.dogName);

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: isComplete || isActive ? 1 : 0.4,
                x: isActive ? 4 : 0,
              }}
              className={`flex items-center gap-3 transition-colors ${
                isComplete ? 'text-[#2E5A4C]' : isActive ? 'text-[#E07B39]' : 'text-gray-300'
              }`}
            >
              {isComplete ? (
                <CheckCircle className="w-6 h-6" />
              ) : isActive ? (
                <div className="w-6 h-6 border-2 border-[#E07B39] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
              <span className={`text-sm ${isActive ? 'font-semibold' : ''}`}>{label}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Screen 6: Plan with Integrated Insight (Final Screen)
const PlanScreen = ({ data }) => {
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const problemId = data.selectedProblem || 'potty';
  const problem = PROBLEMS.find(p => p.id === problemId);
  const planDays = getPlanDays(problemId, data.dogName);
  const days = planDays[problemId] || planDays.default;

  // Show account prompt after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowAccountPrompt(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const insight = problem?.insight?.replace(/{dogName}/g, data.dogName) || 'Your personalized plan is ready!';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-[#FDF6F0] relative"
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6">
          {/* Trial Banner */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#E8F5E9] rounded-xl p-4 mb-6 shadow-sm border border-[#2E5A4C]/10"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <h3 className="font-bold text-[#2E5A4C] text-sm">Your free trial is active!</h3>
                <p className="text-xs text-[#2E5A4C]/70 mt-1">Full access for 3 days</p>
              </div>
            </div>
          </motion.div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-[#333]">{data.dogName}'s {problem?.label}</h1>
            <div className="h-1 w-12 bg-[#E07B39] rounded-full mt-2" />
          </div>

          {/* Insight Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#333] to-[#444] rounded-xl p-4 mb-8 shadow-lg text-white relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 opacity-10">
              <PawPrint className="w-32 h-32 transform translate-x-8 -translate-y-8" />
            </div>
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <Lightbulb className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Toffy's Insight</span>
            </div>
            <p className="text-sm font-medium leading-relaxed relative z-10">
              {insight}
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-5 relative">
            <div className="absolute left-[19px] top-6 bottom-0 w-0.5 bg-gray-200" />

            {days.map((day, idx) => {
              const isActive = idx === 0;
              const isLocked = idx > 0;

              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className={isLocked ? 'opacity-60' : ''}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 border-4 border-[#FDF6F0] ${
                        isActive ? 'bg-[#E07B39] text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {day.day}
                    </div>
                    <span className={`font-bold ${isActive ? 'text-[#333]' : 'text-gray-500'}`}>
                      Day {day.day}: {day.title}
                    </span>
                    {isLocked && <Lock className="w-4 h-4 text-gray-400 ml-auto" />}
                  </div>

                  {isActive ? (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden ml-5">
                      <div className="h-28 bg-gradient-to-br from-[#F5DCC7] to-[#E07B39] relative">
                        <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-[#E07B39]">
                          TODAY
                        </div>
                        <PawPrint className="absolute right-4 bottom-2 w-14 h-14 text-white/30 transform rotate-12" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-[#333] mb-1">{day.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{day.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> {day.lessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {day.duration}
                          </span>
                        </div>
                        <Button>Start Day 1</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/60 rounded-xl border border-gray-100 p-4 ml-5">
                      <p className="text-sm text-gray-500">{day.description}</p>
                      <p className="text-xs text-gray-400 mt-1 italic">
                        Unlocks in {day.day - 1} day{day.day > 2 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Account Prompt Modal */}
      <AnimatePresence>
        {showAccountPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 z-50"
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setShowAccountPrompt(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#FDF6F0] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔐</span>
                </div>
                <h3 className="text-lg font-bold text-[#333] mb-2">Save your progress</h3>
                <p className="text-sm text-gray-500">
                  Create an account to keep {data.dogName}'s training plan
                </p>
              </div>

              <div className="space-y-3">
                <Button variant="social">
                  <span className="font-bold text-blue-500 mr-1">G</span> Continue with Google
                </Button>
                <Button variant="apple">
                  <span className="mr-1"></span> Continue with Apple
                </Button>
                <button
                  onClick={() => setShowAccountPrompt(false)}
                  className="w-full text-center text-gray-500 text-sm py-2 hover:text-[#E07B39]"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
        {[
          { icon: Home, label: 'Home', active: true },
          { icon: Dumbbell, label: 'Train', active: false },
          { icon: BarChart2, label: 'Progress', active: false },
          { icon: MessageCircle, label: 'Chat', active: false },
          { icon: User, label: 'Profile', active: false },
        ].map(({ icon: Icon, label, active }) => (
          <button key={label} className={`flex flex-col items-center gap-1 ${active ? 'text-[#E07B39]' : 'text-gray-400'}`}>
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN APP CONTROLLER
// ============================================

const ToffyApp = () => {
  const [screen, setScreen] = useState(0);
  const [userData, setUserData] = useState({
    dogName: '',
    breed: '',
    age: '',
    selectedProblem: null,
  });

  const nextScreen = useCallback(() => setScreen(prev => prev + 1), []);
  const prevScreen = useCallback(() => setScreen(prev => Math.max(0, prev - 1)), []);
  const updateData = useCallback((data) => setUserData(prev => ({ ...prev, ...data })), []);

  const screens = [
    <WelcomeScreen key="welcome" onNext={nextScreen} />,
    <PetProfileScreen key="pet" onNext={nextScreen} onBack={prevScreen} data={userData} updateData={updateData} />,
    <ChatScreen key="chat" onNext={nextScreen} onBack={prevScreen} data={userData} updateData={updateData} />,
    <GenerationScreen key="generation" onNext={nextScreen} data={userData} />,
    <PlanScreen key="plan" data={userData} />,
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-0 sm:p-4">
      {/* Mobile Device Frame */}
      <div
        className="w-full h-[100dvh] sm:h-[844px] sm:max-w-[390px] bg-[#FDF6F0] sm:rounded-[40px] shadow-2xl overflow-hidden relative sm:border-[10px] sm:border-gray-900"
      >
        {/* Notch (Desktop Preview) */}
        <div className="hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[28px] bg-gray-900 rounded-b-2xl z-50" />

        {/* Screen Content */}
        <div className="h-full w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {screens[screen]}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ToffyApp;
