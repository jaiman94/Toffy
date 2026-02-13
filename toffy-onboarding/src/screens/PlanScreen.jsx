import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Calendar, Clock, BookOpen, Star, Sparkles, Home, Dumbbell, BarChart3, MessageCircle, User, ArrowRight, Lock } from 'lucide-react';
import { getPlanDays, SUBSCRIPTION_CONFIG } from '../data/config';
import confetti from 'canvas-confetti';
import PaywallScreen from './PaywallScreen';

export const PlanScreen = ({ data, setCurrentScreen }) => {
  const dogName = data.dogName || 'Your dog';
  const problemId = data.selectedProblem || 'default';
  const planDays = getPlanDays(problemId, dogName)[problemId] || getPlanDays(problemId, dogName).default;

  const totalLessons = planDays.reduce((sum, day) => sum + day.lessons, 0);
  const totalDuration = planDays.reduce((sum, day) => sum + parseInt(day.duration), 0);

  // State for paywall
  const [showPaywall, setShowPaywall] = useState(false);
  const [unlockedDay, setUnlockedDay] = useState(1);

  // Celebration confetti on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.3 },
        colors: ['#E07B39', '#C86A2E', '#FFD700', '#2E5A4C', '#FF6B6B'],
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleDayStart = (dayNumber) => {
    if (dayNumber <= 3) {
      setUnlockedDay((prev) => Math.max(prev, dayNumber + 1));
      return;
    }
    if (unlockedDay > 3) {
      setShowPaywall(true);
    }
  };

  return (
    <div className="h-full bg-bg-cream flex flex-col relative">
      {/* Trial Banner */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-4 mt-4 bg-[#E8F5E9] rounded-xl p-3 shadow-sm border border-[#2E5A4C]/10"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🎉</span>
          <h3 className="font-bold text-[#2E5A4C] text-sm">Enjoy {SUBSCRIPTION_CONFIG.trialLength} day free trial</h3>
        </div>
      </motion.div>

      {/* Header Card - Clickable to learn more */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="mx-4 mt-3 p-6 bg-gradient-to-br from-[#E07B39] to-[#C86A2E] rounded-2xl text-white relative overflow-hidden cursor-pointer group"
        onClick={() => console.log('Navigate to dog insights')}
      >
        {/* Click hint */}
        <div className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-5 h-5" />
        </div>
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 opacity-20">
          <Sparkles className="w-16 h-16" />
        </div>
        <div className="absolute bottom-2 left-2 opacity-20">
          <Star className="w-8 h-8" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-4xl">🐕</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">{dogName}'s Plan</h1>
              <p className="text-white/80 text-sm">Click to learn more about {dogName}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1 opacity-80" />
              <p className="text-lg font-bold">{planDays.length}</p>
              <p className="text-xs opacity-80">Days</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <BookOpen className="w-5 h-5 mx-auto mb-1 opacity-80" />
              <p className="text-lg font-bold">{totalLessons}</p>
              <p className="text-xs opacity-80">Lessons</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 opacity-80" />
              <p className="text-lg font-bold">{totalDuration}</p>
              <p className="text-xs opacity-80">Minutes</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Plan Title */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-bold text-gray-800">Your 7-Day Plan</h2>
        <p className="text-sm text-gray-500">Complete one day at a time</p>
        <p className="text-xs text-gray-400 mt-1">Consistency matters more than speed.</p>
      </div>

      {/* Day Cards */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <div className="space-y-3">
          {planDays.map((day, idx) => {
            const isUnlocked = day.day <= unlockedDay;
            const isTrialDay = day.day <= 3;
            const canTriggerPaywall = day.day > 3 && unlockedDay > 3;
            return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-xl p-4 border ${idx === 0
                  ? 'bg-gradient-to-r from-[#E07B39] to-[#C86A2E] border-[#E07B39] shadow-lg shadow-[#E07B39]/30'
                  : 'bg-white border-gray-100 shadow-sm'
                }`}
            >
              <div className="flex items-start gap-4">
                {/* Day Number */}
                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${idx === 0 ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                  <span className="text-xs font-medium opacity-80">Day</span>
                  <span className="text-lg font-bold -mt-0.5">{day.day}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold ${idx === 0 ? 'text-white' : 'text-gray-800'}`}>{day.title}</h3>
                  <p className={`text-sm mt-0.5 ${idx === 0 ? 'text-white/80' : 'text-gray-500'}`}>{day.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`flex items-center gap-1 text-xs ${idx === 0 ? 'text-white/70' : 'text-gray-400'}`}>
                      <BookOpen className="w-3.5 h-3.5" />
                      {day.lessons} lessons
                    </span>
                    <span className={`flex items-center gap-1 text-xs ${idx === 0 ? 'text-white/70' : 'text-gray-400'}`}>
                      <Clock className="w-3.5 h-3.5" />
                      {day.duration}
                    </span>
                  </div>
                </div>

                {/* Arrow / Start button for Day 1 */}
                {isUnlocked && isTrialDay ? (
                  <button
                    onClick={() => handleDayStart(day.day)}
                    className="flex items-center gap-1 bg-white text-[#E07B39] px-3 py-1.5 rounded-lg font-semibold text-sm shrink-0"
                  >
                    <PawPrint className="w-4 h-4" />
                    Start
                  </button>
                ) : canTriggerPaywall ? (
                  <button
                    onClick={() => setShowPaywall(true)}
                    className="flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-semibold text-sm shrink-0"
                  >
                    <Lock className="w-4 h-4" />
                    Unlock
                  </button>
                ) : !isUnlocked && isTrialDay ? (
                  <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                    <Lock className="w-4 h-4" />
                    Complete Day {day.day - 1} to unlock
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                    <Lock className="w-4 h-4" />
                    Complete Day 3 to unlock
                  </span>
                )}
              </div>
            </motion.div>
          )})}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 safe-area-bottom">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 p-2 text-[#E07B39]">
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <Dumbbell className="w-5 h-5" />
            <span className="text-xs">Train</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Progress</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">Chat</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="absolute inset-0 z-50">
          <PaywallScreen
            dogName={dogName}
            onSubscribe={() => {
              // Handle subscription logic
              console.log('User subscribed');
              // For now, just close the paywall
              setShowPaywall(false);
            }}
            onClose={() => setShowPaywall(false)}
          />
        </div>
      )}
    </div>
  );
};

export default PlanScreen;
