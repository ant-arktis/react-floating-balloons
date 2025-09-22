import mojs from "@mojs/core";
import React, { useState } from "react";

import { StyledBalloon, StaticBalloonsContainer } from "./Balloon.styles";
import { random, randomColor } from "./utils";

export const Balloon = ({
  msgText,
  colors,
  popVolumeLevel,
  loop,
  hangOnTop,
  supportsTouch,
  staticMode,
  floatingAnimation,
  onBalloonPop,
  balloonIndex,
}) => {
  const delay = random(0, 4);
  const hasMsg = random(0, 2);
  const duration = 10 + random(1, 5);
  const left = random(10, 70); // random init left value to fly
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(true);
  
  // Floating animation parameters for static mode
  const floatingDelay = random(0, 3); // Random delay for each balloon
  const floatingDuration = 2 + random(1, 3); // Duration between 2-5 seconds
  const floatingAmplitude = random(8, 15); // Vertical movement amplitude in pixels
  let audio = new Audio(
    "https://cdn.pixabay.com/audio/2022/03/10/audio_5b4d3bfb9e.mp3"
  );
  audio.volume = popVolumeLevel;

  const popBalloon = (e) => {
    let t = e.currentTarget;
    let color = t.getAttribute("color");
    
    // Get balloon center coordinates relative to viewport
    const rect = t.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const burst = new mojs.Burst({
      radius: { 30: 100 },
      parent: t,
      count: 10,
      className: "show",
      children: {
        fill: [color],
        angle: { 0: 180 },
        delay: "stagger(0, 25)",
        shape: ["circle", "polygon"],
      },
    });
    audio.play();
    burst.replay();
    
    // Call the parent callback with balloon info and coordinates
    if (onBalloonPop) {
      onBalloonPop({
        balloonIndex,
        color,
        centerX,
        centerY,
        rect: {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        }
      });
    }
    
    // setVisible(false)
    t.style.visibility = "hidden";
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  return (
    <>
      {show ? (
        <StyledBalloon
          color={randomColor(colors)}
          onClick={supportsTouch ? popBalloon : null}
          onDoubleClickCapture={supportsTouch ? null : popBalloon}
          animate={{
            delay,
            duration,
            rotate: random(20, 25),
            left,
            loop,
            hangOnTop,
          }}
          show={show}
          visible={visible}
          staticMode={staticMode}
          floatingAnimation={floatingAnimation}
          floatingParams={{
            delay: floatingDelay,
            duration: floatingDuration,
            amplitude: floatingAmplitude,
          }}
          balloonIndex={balloonIndex}
        >
          <div className="string"></div>
          {hasMsg ? <span className="msg">{msgText}</span> : null}
        </StyledBalloon>
      ) : null}
    </>
  );
};

export const Balloons = ({
  count,
  msgText,
  colors,
  popVolumeLevel,
  loop,
  hangOnTop,
  staticMode,
  floatingAnimation,
  onBalloonPop,
}) => {
  const density = count; // concurrent balloon count
  const supportsTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;
  return (
    <StaticBalloonsContainer className={`set-of-balloons ${staticMode ? 'static-mode' : ''}`}>
      {new Array(density).fill(null).map((b, i) => (
        <Balloon
          key={`balloon-${i}`}
          {...{
            msgText,
            colors,
            popVolumeLevel,
            loop,
            hangOnTop,
            supportsTouch,
            staticMode,
            floatingAnimation,
            onBalloonPop,
            balloonIndex: i,
          }}
        />
      ))}
    </StaticBalloonsContainer>
  );
};
