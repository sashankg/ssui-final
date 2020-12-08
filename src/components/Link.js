import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};

export default function Link() {
  const { state, position } = useSelector(state => state.link);
  const mouse = useMousePosition();


  if(state === 'linking') {
    const dx = mouse.x - position.x;
    const dy = mouse.y - position.y;
    return <g>
      <clipPath id="linkMask">
        <ellipse 
          cx={ position.x - 230} 
          cy={ position.y } 
          rx={ Math.sqrt(dx*dx + dy*dy) - 10 } 
          ry={ Math.sqrt(dx*dx + dy*dy) - 10 } 
          fill="black"
        />
      </clipPath>
      <line 
        x1={ position.x - 230 } 
        y1={ position.y }
        x2={ mouse.x - 230 }
        y2={ mouse.y }
        stroke="white"
        strokeWidth="7"
        clipPath="url(#linkMask)"
      />
      <line 
        x1={ position.x - 230 } 
        y1={ position.y }
        x2={ mouse.x - 230 }
        y2={ mouse.y }
        stroke="blue"
        strokeWidth="3"
        clipPath="url(#linkMask)"
      />
      <ellipse 
        cx={ position.x - 230 } 
        cy={ position.y } 
        rx="5" 
        ry="5" 
        fill="blue"
        stroke="white"
        strokeWidth="2"
      />
    </g>
  }
  else {
    return null
  }
}
