import React from 'react';
import { Button } from 'react-bootstrap';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import elementTypes from '../data/elementTypes.js'

function ButtonElement({ height, width, text, disabled }) {
  return <foreignObject
    height={ height }
    width={ width }>
      <Button
        xmlns="http://www.w3.org/1999/xhtml"
        variant="primary"
        style={ { minHeight: height } }
        disabled={ disabled }
        block>
        { text }
      </Button>
  </foreignObject>
}

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

  const anchorRef = React.useRef();

  return <Draggable
    disabled={!isDraggable}
    position={ { x: element.x, y: element.y } }
    nodeRef={ ref }
    onStop={ (e, data) => {
      if(data.x > 0 && data.x < 500 && data.y > 0 && data.y < 500) {
        dispatch({ 
          type: 'UPDATE_ELEMENT', 
          data: { 
            id, 
            x: data.x,
            y: data.y,
          } 
        });
      }
    }}
    onStart={ e => { 
      e.stopPropagation() 
      dispatch({
        type: 'SELECT_ELEMENT',
        id,
      })
    }}
    scale={ workspace.scale }
  >
    <g className="element" ref={ ref }>
      <ButtonElement 
        width={ element.width }
        height={ element.height }
        text={ element.text }
        disabled={ false }
      />
      <Draggable
        disabled={!isDraggable}
        onStart={ e => e.stopPropagation() } 
        onDrag={ (e, data) => {
          dispatch({ 
            type: 'UPDATE_ELEMENT',
            data: {
              id,
              width: (data.x + 5),
              height: data.y + 5,
            }
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
