export default function selectedReducer(state, action) {
  switch(action.type) {
    case 'SELECT_ELEMENT':
      return {
        id: action.id,
        type: 'element',
      }
    case 'SELECT_PAGE':
      return {
        id: action.id,
        type: 'page',
      }
    case 'DESELECT':
      return {
        id: null,
        type: null,
      }
    default: 
      return state || {
        id: null,
        type: null,
      }
  }
}
