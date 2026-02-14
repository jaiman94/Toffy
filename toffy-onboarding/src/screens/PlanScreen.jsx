import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Calendar, Clock, BookOpen, Sparkles, Home, Dumbbell, BarChart3, MessageCircle, User, Lock } from 'lucide-react';
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

      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 mt-3 p-4 bg-gradient-to-br from-[#E07B39] to-[#C86A2E] rounded-2xl text-white relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-1 right-1 opacity-20">
          <Sparkles className="w-12 h-12" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-2xl">🐕</span>
            </div>
            <h1 className="text-lg font-bold">{dogName}'s Plan</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/20 rounded-xl p-2 text-center">
              <Calendar className="w-4 h-4 mx-auto mb-0.5 opacity-80" />
              <p className="text-base font-bold">{planDays.length}</p>
              <p className="text-[10px] opacity-80">Days</p>
            </div>
            <div className="bg-white/20 rounded-xl p-2 text-center">
              <BookOpen className="w-4 h-4 mx-auto mb-0.5 opacity-80" />
              <p className="text-base font-bold">{totalLessons}</p>
              <p className="text-[10px] opacity-80">Lessons</p>
            </div>
            <div className="bg-white/20 rounded-xl p-2 text-center">
              <Clock className="w-4 h-4 mx-auto mb-0.5 opacity-80" />
              <p className="text-base font-bold">{totalDuration}</p>
              <p className="text-[10px] opacity-80">Minutes</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Plan Title */}
      <div className="px-5 pt-3 pb-2">
        <h2 className="text-base font-bold text-gray-800">Your 7-Day Plan</h2>
        <p className="text-xs text-gray-400">One day at a time. Consistency over speed.</p>
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
              className={`rounded-xl p-3 border ${idx === 0
                  ? 'bg-gradient-to-r from-[#E07B39] to-[#C86A2E] border-[#E07B39] shadow-lg shadow-[#E07B39]/30'
                  : 'bg-white border-gray-100 shadow-sm'
                }`}
            >
              <div className="flex items-center gap-3">
                {/* Day Number */}
                <div className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center shrink-0 ${idx === 0 ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-600'
                  }`}>
                  <span className="text-[9px] font-medium opacity-70 leading-none">Day</span>
                  <span className="text-sm font-bold leading-tight">{day.day}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm ${idx === 0 ? 'text-white' : 'text-gray-800'}`}>{day.title}</h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className={`flex items-center gap-1 text-[11px] ${idx === 0 ? 'text-white/70' : 'text-gray-400'}`}>
                      <BookOpen className="w-3 h-3" />
                      {day.lessons}
                    </span>
                    <span className={`flex items-center gap-1 text-[11px] ${idx === 0 ? 'text-white/70' : 'text-gray-400'}`}>
                      <Clock className="w-3 h-3" />
                      {day.duration}
                    </span>
                  </div>
                </div>

                {/* Action */}
                {isUnlocked && isTrialDay ? (
                  <button
                    onClick={() => handleDayStart(day.day)}
                    className="flex items-center gap-1 bg-white text-[#E07B39] px-3 py-1.5 rounded-lg font-semibold text-xs shrink-0"
                  >
                    <PawPrint className="w-3.5 h-3.5" />
                    Start
                  </button>
                ) : canTriggerPaywall ? (
                  <button
                    onClick={() => setShowPaywall(true)}
                    className="flex items-center gap-1 bg-gray-100 text-gray-500 px-2.5 py-1.5 rounded-lg font-medium text-xs shrink-0"
                  >
                    <Lock className="w-3 h-3" />
                    Unlock
                  </button>
                ) : !isUnlocked && isTrialDay ? (
                  <span className="flex items-center gap-1 text-[11px] text-gray-400 shrink-0">
                    <Lock className="w-3 h-3" />
                    Day {day.day - 1} first
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] text-gray-400 shrink-0">
                    <Lock className="w-3 h-3" />
                    Locked
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
