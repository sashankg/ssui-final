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
  return { 
    type: 'UPDATE_ELEMENT', 
    data: { id, ...data } 
  }
}
