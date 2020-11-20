import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import Page from './Page.js';

var workspaceElement;

const mouseState = {
  workspaceDown: 0,
  elementDown: 1,
  up: 2,
}

export const WorkspaceContext = React.createContext()

export default function Workspace() {
  const pages = useSelector(state => state.pages);
  const dispatch = useDispatch();

  const [mouse, setMouse] = React.useState({ state: mouseState.up });
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [scale, setScale] = React.useState(1);

  const [{ dropResult }, drop] = useDrop({
    accept: 'page',
    drop(item, monitor) {
      const { x, y } = monitor.getSourceClientOffset();
      dispatch({ 
        type: 'ADD_PAGE',
        data: {
          type: item.tool,
          x: (x - offset.x - 245) / scale,
          y: (y - offset.y) / scale,
        }
      })
    }
  })

  return <WorkspaceContext.Provider value={{ offset, scale }}>
    <svg 
      className="workspace" 
      ref={ el => { 
        drop(el);
        workspaceElement = el;
      }}
      onMouseMove={ e => {
        if(mouse.state === mouseState.workspaceDown) {
          setOffset({ 
            x: mouse.initialOffset.x - mouse.initialPointer.x + e.clientX , 
            y: mouse.initialOffset.y - mouse.initialPointer.y + e.clientY 
          });
        }
      }}
      onMouseDown={ e => {
        if(e.target.getAttribute('class') === 'workspace' && e.button === 0 || e.button === 1) {
          setMouse({ 
            state: mouseState.workspaceDown,
            initialPointer: {
              x: e.clientX,
              y: e.clientY,
            },
            initialOffset: {
              x: offset.x,
              y: offset.y,
            }
          });
        }
      }}
      onMouseUp={ e => {
        setMouse({ state: mouseState.up });
      }}
      onMouseLeave={ e => {
        setMouse({ state: mouseState.up });
      }}
      onWheel={ e => {
        if(e.deltaY < 0 && scale > 0.2 || e.deltaY > 0 && scale < 2) {
          console.log(e);
          const newScale = scale + e.deltaY * 0.01;
          setScale(newScale);
          //setOffset({ 
          //  x: e.pageX - (e.pageX - offset.x) * newScale,
          //  y: e.pageY - (e.pageY - offset.y) * newScale,
          //})
        }
      }}
      onContextMenu={ e => {
        e.preventDefault();
      }}
    >
      <g transform={ `translate(${ offset.x }, ${ offset.y }) scale(${ scale })` }>
        { pages.allIds.map(id => {
          return <Page key={ id } id={ id } />
        })}
      </g>
    </svg>
  </WorkspaceContext.Provider>
}
