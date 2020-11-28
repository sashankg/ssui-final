import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
      return <g>
        <line 
          x1={ position.x - 230 } 
          y1={ position.y }
          x2={ mouse.x - 230 }
          y2={ mouse.y }
          style={ { stroke: 'white', strokeWidth: 7 } }
        />
        <line 
          x1={ position.x - 230 } 
          y1={ position.y }
          x2={ mouse.x - 230 }
          y2={ mouse.y }
          style={ { stroke: 'blue', strokeWidth: 3 } }
        />
        <oval x={ position.x - 230 } y={ position.y }></oval>
      </g>
  }
  else {
    return null
  }
}
