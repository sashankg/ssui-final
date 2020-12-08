import { onUpdateElement } from './constraintActions.js';

export function selectElement(id) {
  return {
    type: 'SELECT_ELEMENT',
    id,
  }
}

export function addElement(page, type, x, y) {
  return { 
    type: 'ADD_ELEMENT',
    data: {
      page,
      type,
      x,
      y,
      width: 50,
      height: 50,
    }
  }
}

export function updateElement(id, data) {
  console.log(data);
  return dispatch => {
    dispatch({ 
      type: 'UPDATE_ELEMENT', 
      data: { id, ...data } 
    })
    onUpdateElement(id, data, dispatch)
  }
}
