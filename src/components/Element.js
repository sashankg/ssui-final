import React from 'react';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import elementTypes from '../data/elementTypes.js'
import { 
  cancelLink,
  startLink,
  finishLink,
} from '../actions/linkActions.js';
import {
  selectElement,
  updateElement,
} from '../actions/elementActions.js';

export default function Element({ id }) {
  const ref = React.useRef();
  const element = useSelector(state => state.elements.byId[id]);
  const workspace = useSelector(state => state.workspace);
  const selectedSelector = createSelector(
    state => state.selected, 
    ({ id: selectedId, type }) => type === 'element' && selectedId === id,
  )
  const selected = useSelector(selectedSelector);
  const dispatch = useDispatch();

  const anchorRef = React.useRef();

  function handleMouseUp(e) {
    if(e.button === 2) {
      e.stopPropagation();
      dispatch(finishLink('element', id))
    } 
  }

  return <Draggable 
    position={ { x: element.x, y: element.y } }
    nodeRef={ ref }
    onMouseDown={ e => {
      if(e.button === 2) {
        e.stopPropagation();
        dispatch(startLink('element', id, e.clientX, e.clientY));
      } 
    }}
    onStop={ (e, data) => {
      if(data.x > 0 && data.x < 500 && data.y > 0 && data.y < 500) {
        dispatch(updateElement(id, { x: Math.floor(data.x), y: Math.floor(data.y) }));
      }
    }}
    onStart={ e => { 
      e.stopPropagation() 
      dispatch(selectElement(id))
    }}
    scale={ workspace.scale }
  >
    <g 
      className="element" 
      ref={ ref } 
    >
      <rect 
        fill="black" 
        width={ element.width } 
        height={ element.height } 
        stroke="red"
        strokeWidth={ selected ? 4 : 0}
        onMouseUp={ handleMouseUp }
      />
      <text 
        fill="white" 
        x={ element.width / 2 } 
        y={ element.height / 2 } 
        dominantBaseline="middle" 
        textAnchor="middle"
        onMouseUp={ handleMouseUp }
      >{ elementTypes[element.type].name }</text>
      <Draggable
        onStart={ e => e.stopPropagation() } 
        onDrag={ (e, data) => {
          dispatch(updateElement(id, { 
            width: Math.floor(data.x + 5), 
            height: Math.floor(data.y + 5)
          }))
        }}
        nodeRef={ anchorRef }
        position={{ x: element.width - 5, y: element.height - 5 }}
        scale={ workspace.scale }
      >
        <rect 
          ref={ anchorRef }
          fill="white" 
          stroke="grey" 
          width="10" 
          height="10" 
        />
      </Draggable>
    </g>
  </Draggable>
}
