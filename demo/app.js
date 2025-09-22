import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import {ReactFloatingBalloons} from '../src';

const centerAlign = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const containerStyle = {
  ...centerAlign,
  backgroundColor: '#000',
  height: '100vh',
};

const textContainerStyle = {
  ...centerAlign,
};

const textStyle = {
  color: '#3f51b5',
  fontFamily: 'sans-serif',
  fontSize: '2.5em',
  textTransform: 'uppercase'
};

const App = () => {
  const [staticMode, setStaticMode] = useState(false);
  const [floatingAnimation, setFloatingAnimation] = useState(false);
  const [popEvents, setPopEvents] = useState([]);
  const [showPopEffects, setShowPopEffects] = useState([]);

  const handleBalloonPop = (popData) => {
    console.log('Balloon popped:', popData);
    setPopEvents(prev => [...prev, popData]);
    
    // Create a temporary pop effect at the balloon location
    const effect = {
      id: Date.now(),
      x: popData.centerX,
      y: popData.centerY,
      color: popData.color
    };
    setShowPopEffects(prev => [...prev, effect]);
    
    // Remove the effect after 3 seconds
    setTimeout(() => {
      setShowPopEffects(prev => prev.filter(e => e.id !== effect.id));
    }, 3000);
  };

  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <h1 style={textStyle}>
          React <br />
          Floating <br />
          Balloons 
        </h1>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setStaticMode(!staticMode)}
            style={{
              padding: '10px 20px',
              backgroundColor: staticMode ? '#4CAF50' : '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {staticMode ? 'Switch to Animated' : 'Switch to Static'}
          </button>
          
          {staticMode && (
            <button 
              onClick={() => setFloatingAnimation(!floatingAnimation)}
              style={{
                padding: '10px 20px',
                backgroundColor: floatingAnimation ? '#FF9800' : '#9C27B0',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {floatingAnimation ? 'Disable Floating' : 'Enable Floating'}
            </button>
          )}
          
          <div style={{ color: 'white', fontSize: '14px' }}>
            Popped: {popEvents.length} | Mode: {staticMode ? (floatingAnimation ? 'Static + Floating' : 'Static') : 'Animated'}
          </div>
        </div>
      </div>
      
      <ReactFloatingBalloons 
        staticMode={staticMode}
        floatingAnimation={floatingAnimation}
        onBalloonPop={handleBalloonPop}
        count={staticMode ? 5 : 7}
      />
      
      {/* Pop effect indicators */}
      {showPopEffects.map(effect => (
        <div
          key={effect.id}
          style={{
            position: 'fixed',
            left: effect.x - 25,
            top: effect.y - 25,
            width: '50px',
            height: '50px',
            backgroundColor: effect.color,
            borderRadius: '50%',
            opacity: 0.7,
            pointerEvents: 'none',
            zIndex: 1000,
            animation: 'fadeOut 3s ease-out forwards'
          }}
        />
      ))}
      
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(0.5); }
        }
      `}</style>
    </div>
  );
};

const container = document.getElementById('content');
const root = createRoot(container);
root.render(<App />);