# React Floating Balloons - New Features

## Static Mode

You can now render balloons in a static horizontal line instead of animating them by using the `staticMode` prop:

```jsx
import { ReactFloatingBalloons } from 'react-floating-balloons';

// Static mode - balloons displayed horizontally
<ReactFloatingBalloons 
  staticMode={true}
  count={5}
  colors={['red', 'blue', 'green', 'yellow', 'purple']}
/>
```

## Floating Animation (Static Mode Only)

When in static mode, you can add subtle floating animations to make the balloons appear to gently float up and down:

```jsx
import { ReactFloatingBalloons } from 'react-floating-balloons';

// Static mode with floating animation
<ReactFloatingBalloons 
  staticMode={true}
  floatingAnimation={true}
  count={5}
  colors={['red', 'blue', 'green', 'yellow', 'purple']}
/>
```

The floating animation features:
- **Random timing**: Each balloon has a different animation delay and duration
- **Configurable amplitude**: Vertical movement ranges from 8-15 pixels
- **Smooth easing**: Uses ease-in-out timing for natural movement
- **Infinite loop**: Continues floating indefinitely

## Balloon Pop Callback

You can now get notified when a balloon is popped and receive the balloon's center coordinates:

```jsx
import { ReactFloatingBalloons } from 'react-floating-balloons';

const handleBalloonPop = (popData) => {
  console.log('Balloon popped!', popData);
  // popData contains:
  // - balloonIndex: number (index of the popped balloon)
  // - color: string (color of the popped balloon)
  // - centerX: number (X coordinate of balloon center)
  // - centerY: number (Y coordinate of balloon center)
  // - rect: object (full bounding rectangle info)
};

<ReactFloatingBalloons 
  onBalloonPop={handleBalloonPop}
  count={7}
/>
```

## Complete Example

Here's a complete example that demonstrates both features:

```jsx
import React, { useState } from 'react';
import { ReactFloatingBalloons } from 'react-floating-balloons';

const App = () => {
  const [staticMode, setStaticMode] = useState(false);
  const [floatingAnimation, setFloatingAnimation] = useState(false);
  const [popEvents, setPopEvents] = useState([]);

  const handleBalloonPop = (popData) => {
    console.log('Balloon popped:', popData);
    setPopEvents(prev => [...prev, popData]);
    
    // You can now render another component at the pop location
    // using popData.centerX and popData.centerY
  };

  return (
    <div>
      <button onClick={() => setStaticMode(!staticMode)}>
        {staticMode ? 'Switch to Animated' : 'Switch to Static'}
      </button>
      
      {staticMode && (
        <button onClick={() => setFloatingAnimation(!floatingAnimation)}>
          {floatingAnimation ? 'Disable Floating' : 'Enable Floating'}
        </button>
      )}
      
      <div>Popped balloons: {popEvents.length}</div>
      
      <ReactFloatingBalloons 
        staticMode={staticMode}
        floatingAnimation={floatingAnimation}
        onBalloonPop={handleBalloonPop}
        count={staticMode ? 5 : 7}
        colors={['red', 'blue', 'green', 'yellow', 'purple', 'orange']}
      />
    </div>
  );
};
```

## Props Reference

### New Props

- `staticMode` (boolean, default: false): When true, renders balloons in a static horizontal line instead of animating
- `floatingAnimation` (boolean, default: false): When true and in static mode, adds subtle up-down floating animation
- `onBalloonPop` (function, optional): Callback function called when a balloon is popped

### Pop Callback Data

The `onBalloonPop` callback receives an object with:
- `balloonIndex`: The index of the popped balloon
- `color`: The color of the popped balloon
- `centerX`: X coordinate of the balloon center (relative to viewport)
- `centerY`: Y coordinate of the balloon center (relative to viewport)
- `rect`: Full bounding rectangle object with left, top, width, height

### Existing Props

All existing props continue to work:
- `count`: Number of balloons to display
- `msgText`: Text to display on balloons
- `colors`: Array of balloon colors
- `popVolumeLevel`: Volume level for pop sound (0-1)
- `loop`: Whether to loop the animation
- `hangOnTop`: Whether balloons hang at the top
