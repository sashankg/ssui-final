import React from 'react';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { createSelector } from 'reselect';

import Element from './Element.js';
import { WorkspaceContext } from './Workspace.js';


export default function Page({ id }) {
  const page = useSelector(state => state.pages.byId[id]);

  const elementsSelector = createSelector(
    state => state.elements.allIds, 
    state => state.elements.byId,
    (ids, elements) => 
      ids.filter(elId => elements[elId].page === id)
        .map(elId => ({ ...elements[elId],  id: elId }))
  );
  const elements = useSelector(elementsSelector);

  const workspace = useSelector(state => state.workspace);

  const ref = React.useRef();
  const dispatch = useDispatch();

  const [{ dropResult }, drop] = useDrop({
    accept: 'element',
    drop(item, monitor) {
      const { x, y } = monitor.getSourceClientOffset();
      console.log(monitor);
      dispatch({ 
        type: 'ADD_ELEMENT',
        data: {
          type: item.tool,
          x: (x - workspace.offset.x - 245) / workspace.scale - page.x,
          y: (y - workspace.offset.y) / workspace.scale - page.y,
          page: id,
        }
      })
    }
  })

  return <Draggable 
    nodeRef={ ref }
    position={ { x: page.x, y: page.y } }
    onStop={ (e, data) => {
      dispatch({ type: 'UPDATE_PAGE', data: { id, x: data.x, y: data.y } })
    }}
    onStart={ e => e.stopPropagation() }
    scale={ workspace.scale }
  >
    <g ref={ ref } className="page">
      <rect 
        className="pageBackground"
        fill="white"
        stroke="grey"
        rx="8"
        ref={ drop } 
        width="500"
        height="500" 
      />
      { elements.map(element => <Element key={ element.id } element={ element } />) }
    </g>
  </Draggable>
}
