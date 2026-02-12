import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PetProfileScreen } from './screens/PetProfileScreen';
import { ChatScreen } from './screens/ChatScreen';
import { GenerationScreen } from './screens/GenerationScreen';
import { PlanScreen } from './screens/PlanScreen';
import { DiagnosisScreen } from './screens/DiagnosisScreen';
import './index.css';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [data, setData] = useState({
    dogName: '',
    breed: '',
    age: '',
    selectedProblem: null,
    chatResponses: {},
  });

  const updateData = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextScreen = () => {
    const screens = ['welcome', 'profile', 'chat', 'generation', 'diagnosis', 'plan'];
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex < screens.length - 1) {
      setCurrentScreen(screens[currentIndex + 1]);
    }
  };

  const prevScreen = () => {
    const screens = ['welcome', 'profile', 'chat', 'generation', 'diagnosis', 'plan'];
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex > 0) {
      setCurrentScreen(screens[currentIndex - 1]);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen key="welcome" onNext={nextScreen} />;
      case 'profile':
        return (
          <PetProfileScreen
            key="profile"
            onNext={nextScreen}
            onBack={prevScreen}
            data={data}
            updateData={updateData}
          />
        );
      case 'chat':
        return (
          <ChatScreen
            key="chat"
            onNext={nextScreen}
            onBack={prevScreen}
            data={data}
            updateData={updateData}
          />
        );
      case 'generation':
        return <GenerationScreen key="generation" onNext={nextScreen} data={data} />;
      case 'diagnosis':
        return <DiagnosisScreen key="diagnosis" onNext={nextScreen} data={data} />;
      case 'plan':
        return <PlanScreen key="plan" data={data} setCurrentScreen={setCurrentScreen} />;
      default:
        return <WelcomeScreen onNext={nextScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 sm:p-4 font-sans text-gray-900">
      <div className="w-full h-full sm:h-[850px] sm:w-[400px] bg-bg-cream shadow-2xl overflow-hidden relative sm:rounded-[40px] border-0 sm:border-[8px] sm:border-gray-900 ring-1 ring-black/5">
        {/* Phone Notch - Desktop Preview Only */}
        <div className="hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[28px] bg-gray-900 rounded-b-2xl z-50" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
