export default function modesReducer(state, action) {
  switch(action.type) {
    case 'CHANGE_MODE':
      return {
        active_mode: action.data.active_mode
      }
    default: 
      return state || {
        active_mode: 'create'
      }
  }
}
