import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Calendar, Clock, BookOpen, ChevronRight, Star, Sparkles, Home, Dumbbell, BarChart3, MessageCircle, User, X } from 'lucide-react';
import { getPlanDays } from '../data/config';
import confetti from 'canvas-confetti';

export const PlanScreen = ({ data }) => {
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const dogName = data.dogName || 'Your dog';
  const problemId = data.selectedProblem || 'default';
  const planDays = getPlanDays(problemId, dogName)[problemId] || getPlanDays(problemId, dogName).default;

  const totalLessons = planDays.reduce((sum, day) => sum + day.lessons, 0);
  const totalDuration = planDays.reduce((sum, day) => sum + parseInt(day.duration), 0);

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

  // Show account prompt after 8 seconds (give user time to explore)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAccountPrompt(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full bg-bg-cream flex flex-col relative">
      {/* Trial Banner */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-4 mt-4 bg-[#E8F5E9] rounded-xl p-4 shadow-sm border border-[#2E5A4C]/10"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <h3 className="font-bold text-[#2E5A4C] text-sm">Your free trial is active!</h3>
            <p className="text-xs text-[#2E5A4C]/70 mt-1">Full access for 3 days</p>
          </div>
        </div>
      </motion.div>

      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 mt-3 p-6 bg-gradient-to-br from-[#E07B39] to-[#C86A2E] rounded-2xl text-white relative overflow-hidden"
      >
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
              <p className="text-white/80 text-sm">Journey to Greatness!</p>
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
        <p className="text-sm text-gray-500">Complete one day at a time for best results</p>
      </div>

      {/* Day Cards */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <div className="space-y-3">
          {planDays.map((day, idx) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-xl p-4 border ${
                idx === 0
                  ? 'bg-gradient-to-r from-[#E07B39] to-[#C86A2E] border-[#E07B39] shadow-lg shadow-[#E07B39]/30'
                  : 'bg-white border-gray-100 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Day Number */}
                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${
                  idx === 0 ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
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
                {idx === 0 ? (
                  <div className="flex items-center gap-1 bg-white text-[#E07B39] px-3 py-1.5 rounded-lg font-semibold text-sm shrink-0">
                    <PawPrint className="w-4 h-4" />
                    Start
                  </div>
                ) : (
                  <ChevronRight className="w-5 h-5 shrink-0 text-gray-300" />
                )}
              </div>
            </motion.div>
          ))}
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

      {/* Account Prompt Modal */}
      <AnimatePresence>
        {showAccountPrompt && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowAccountPrompt(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 z-50 shadow-xl"
            >
              {/* Close button */}
              <button
                onClick={() => setShowAccountPrompt(false)}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-bg-orange mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">🐕</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Save your progress!</h3>
                <p className="text-gray-500 text-sm">Create an account to keep {dogName}'s training plan and track progress.</p>
              </div>

              {/* Sign-in buttons */}
              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button className="w-full py-3 px-4 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </button>
              </div>

              {/* Maybe later */}
              <button
                onClick={() => setShowAccountPrompt(false)}
                className="w-full mt-4 py-2 text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors"
              >
                Maybe later
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanScreen;
