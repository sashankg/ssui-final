import React from 'react';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import Element from './Element.js';
import { WorkspaceContext } from './Workspace.js';

export default function Page({ id }) {
  const page = useSelector(state => state.pages.byId[id]);
  const elements = useSelector(state => { 
    return state.elements.allIds
      .filter(elId => state.elements.byId[elId].page === id)
      .map(elId => ({ ...state.elements.byId[elId],  id: elId })) 
  });
  const workspace = React.useContext(WorkspaceContext);

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
