import React, { useState } from 'react';
import { WelcomeScreen } from './screens/WelcomeScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'sans-serif', color: '#111827' }}>
      <div style={{ width: '100%', maxWidth: '400px', height: '850px', backgroundColor: '#FDF6F0', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden', position: 'relative', borderRadius: '40px', border: '8px solid #111827' }}>
        <WelcomeScreen onNext={() => console.log('next')} />
      </div>
    </div>
  );
};

export default App;
