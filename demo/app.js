import React from 'react';
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

class App extends React.Component {
  render() {
    return (
      <div style={containerStyle}>
        <div style={textContainerStyle}>
          <h1 style={textStyle}>
            React <br />
            Floating <br />
            Balloons 
          </h1>
        </div>
        
        <ReactFloatingBalloons />
      </div>
    );
  }
}

const container = document.getElementById('content');
const root = createRoot(container);
root.render(<App />);