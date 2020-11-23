import React from 'react';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import { WorkspaceContext } from './Workspace.js';

export default function Element({ element }) {
  const ref = React.useRef();
  const workspace = React.useContext(WorkspaceContext);
  const dispatch = useDispatch();
  return <Draggable 
    position={ { x: element.x, y: element.y } }
    nodeRef={ ref }
    onStop={ (e, data) => {
      if(data.x > 0 && data.x < 500 && data.y > 0 && data.y < 500) {
        dispatch({ 
          type: 'UPDATE_ELEMENT', 
          data: { 
            id: element.id, 
            x: data.x,
            y: data.y,
          } 
        });
      }
    }}
    onStart={ e => e.stopPropagation() }
    scale={ workspace.scale }
  >
    <g className="element" ref={ ref }>
      <rect fill="red" width="100" height="100"></rect>
      <text 
        fill="black" 
        x={ 50 } 
        y={ 50 } 
        dominantBaseline="middle" 
        textAnchor="middle"
      >{ element.type }</text>
    </g>
  </Draggable>    
}
