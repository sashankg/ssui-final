import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { pan, zoom } from '../actions/workspaceActions.js';
import { addPage } from '../actions/pageActions.js';
import { cancelLink } from '../actions/linkActions.js';

import Page from './Page.js';
import Link from './Link.js';

const mouseState = {
  workspaceDown: 0,
  elementDown: 1,
  up: 2,
}

export default function Workspace() {
  const pages = useSelector(state => state.pages);
  const dispatch = useDispatch();

  const [mouse, setMouse] = React.useState({ state: mouseState.up });
  const { offset, scale } = useSelector(state => state.workspace);

  const [, drop] = useDrop({
    accept: 'page',
    drop(item, monitor) {
      const { x, y } = monitor.getSourceClientOffset();
      dispatch(addPage(
        item.tool, 
        (x - offset.x - 230) / scale, 
        (y - offset.y) / scale
      ))
    }
  })

  return <svg 
    className="workspace" 
    ref={ drop }
    onMouseMove={ e => {
      if(mouse.state === mouseState.workspaceDown) {
        dispatch(pan(
          mouse.initialOffset.x - mouse.initialPointer.x + e.clientX, 
          mouse.initialOffset.y - mouse.initialPointer.y + e.clientY 
        ));
      }
    }}
    onMouseDown={ e => {
      if((e.target.getAttribute('class') === 'workspace' && e.button === 0) || e.button === 1) {
        setMouse({ 
          state: mouseState.workspaceDown,
          initialPointer: {
            x: e.clientX,
            y: e.clientY,
          },
          initialOffset: offset,
        });
      }
    }}
    onMouseUp={ e => {
      setMouse({ state: mouseState.up });
      if(e.button === 2) {
        dispatch(cancelLink()) 
      }
    }}
    onMouseLeave={ e => {
      setMouse({ state: mouseState.up });
    }}
    onWheel={ e => {
      if((e.deltaY < 0 && scale > 0.2) || (e.deltaY > 0 && scale < 2)) {
        const newScale = scale + e.deltaY * 0.01;
        dispatch(zoom(newScale));
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
    <Link />
  </svg>
}
