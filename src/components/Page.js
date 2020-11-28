import React from 'react';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { createSelector } from 'reselect';

import Element from './Element.js';


export default function Page({ id }) {
  const page = useSelector(state => state.pages.byId[id]);

  const elementsSelector = createSelector(
    state => state.elements.allIds, 
    state => state.elements.byId,
    (ids, elements) => ids.filter(elId => elements[elId].page === id)
  );
  const elements = useSelector(elementsSelector);

  const selectedSelector = createSelector(
    state => state.selected,
    ({ id: selectedId, type }) => type === 'page' && selectedId === id,
  )
  const selected = useSelector(selectedSelector);

  const workspace = useSelector(state => state.workspace);

  const ref = React.useRef();
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: 'element',
    drop(item, monitor) {
      const { x, y } = monitor.getSourceClientOffset();
      dispatch({ 
        type: 'ADD_ELEMENT',
        data: {
          type: item.tool,
          x: Math.floor((x - workspace.offset.x - 230) / workspace.scale - page.x),
          y: Math.floor((y - workspace.offset.y) / workspace.scale - page.y),
          width: 50,
          height: 50,
          page: id,
        }
      })
    }
  })

  return <Draggable 
    nodeRef={ ref }
    position={ { x: page.x, y: page.y } }
    onMouseDown={ e => {
      if(e.button === 2) {
        e.stopPropagation();
        dispatch({
          type: 'START_LINK',
          item: {
            type: 'page',
            id,
          },
          position: {
            x: e.clientX,
            y: e.clientY,
          }
        })
      } 
    }}
    onStop={ (e, data) => {
      dispatch({ type: 'UPDATE_PAGE', data: { id, x: data.x, y: data.y } })
    }}
    onStart={ e => { 
      e.stopPropagation() 
      dispatch({
        type: 'SELECT_PAGE',
        id,
      })
    }}
    scale={ workspace.scale }
  >
    <g ref={ ref } className="page">
      <rect 
        className="pageBackground"
        fill="white"
        stroke={ selected ? "red" : "grey" }
        strokeWidth="4"
        rx="8"
        ry="8"
        ref={ drop } 
        width="500"
        height="500" 
        onMouseUp={ e => {
          if(e.button === 2) {
            e.stopPropagation();
            dispatch({
              type: 'FINISH_LINK',
              item: {
                type: 'page',
                id,
              }
            })
          } 
        }}
      />
      { elements.map(elId => <Element key={ elId } id={ elId } />) }
    </g>
  </Draggable>
}
