export function addPage(type, x, y) {
  return { 
    type: 'ADD_PAGE',
    data: {
      type,
      x,
      y,
    }
  }
}

export function updatePage(id, data) {
  return {
    type: 'UPDATE_PAGE',
    data: { id, ...data }
  }
}

export function selectPage(id) {
  return {
    type: 'SELECT_PAGE',
    id,
  }
}
