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
  const isDraggable = useSelector(state => state.modes.active_mode) === 'create';
  const selectedSelector = createSelector(
    state => state.selected, 
    ({ id: selectedId, type }) => type === 'element' && selectedId === id && isDraggable,
  )
  const selected = useSelector(selectedSelector);
  const dispatch = useDispatch();

  const [tempSize, setTempSize] = React.useState(null); 

  const anchorRef = React.useRef();

  function handleMouseUp(e) {
    if(e.button === 2) {
      e.stopPropagation();
      dispatch(finishLink('element', id))
    } 
  }

  return <Draggable
    disabled={!isDraggable}
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
        width={ tempSize ? tempSize.width : element.width } 
        height={ tempSize ? tempSize.height : element.height } 
        stroke="red"
        strokeWidth={ selected ? 4 : 0}
        onMouseUp={ handleMouseUp }
      />
      <text 
        fill="white" 
        x={ tempSize ? tempSize.width / 2 : element.width / 2 } 
        y={ tempSize ? tempSize.height / 2 : element.height / 2 } 
        dominantBaseline="middle" 
        textAnchor="middle"
        onMouseUp={ handleMouseUp }
      >{ elementTypes[element.type].name }</text>
      <Draggable
        disabled={!isDraggable}
        onStart={ e => e.stopPropagation() } 
        onStop={ (e, data) => {
          dispatch(updateElement(id, { 
            width: Math.floor(data.x + 5), 
            height: Math.floor(data.y + 5)
          }))
          setTempSize(null);
        }}
        onDrag={ (e, data) => {
          setTempSize({ 
            width: data.x + 5,
            height: data.y + 5,
          })
        }}
        nodeRef={ anchorRef }
        position={{ x: element.width - 5, y: element.height - 5 }}
        scale={ workspace.scale }
      >
        <rect
          className={!isDraggable ? "hidden" : null} 
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
