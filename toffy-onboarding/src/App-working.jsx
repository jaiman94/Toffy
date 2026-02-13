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
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'sans-serif', color: '#111827' }}>
      <div style={{ width: '100%', maxWidth: '400px', height: '850px', backgroundColor: '#FDF6F0', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden', position: 'relative', borderRadius: '40px', border: '8px solid #111827' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%' }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
