import React from 'react';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { createSelector } from 'reselect';
import { 
  cancelLink,
  startLink,
  finishLink,
} from '../actions/linkActions.js';
import { addElement } from '../actions/elementActions.js';
import { updatePage, selectPage } from '../actions/pageActions.js';

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
      dispatch(addElement(
        id,
        item.tool,
        Math.floor((x - workspace.offset.x - 230) / workspace.scale - page.x),
        Math.floor((y - workspace.offset.y) / workspace.scale - page.y),
      ))
    }
  })

  return <Draggable 
    nodeRef={ ref }
    position={ { x: page.x, y: page.y } }
    onMouseDown={ e => {
      if(e.button === 2) {
        e.stopPropagation();
        dispatch(startLink('page', id, e.clientX, e.clientY));
      } 
    }}
    onStop={ (e, data) => {
      dispatch(updatePage(id, { x: data.x, y: data.y }))
    }}
    onStart={ e => { 
      e.stopPropagation() 
      dispatch(selectPage(id));
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
            dispatch(finishLink('page', id))
          } 
        }}
      />
      { elements.map(elId => <Element key={ elId } id={ elId } />) }
    </g>
  </Draggable>
}
