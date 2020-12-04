export default function runspaceReducer(state, action) {
  switch(action.type) {
    case 'CHANGE_PAGE':
      return {
        current_page: action.data.current_page
      }
    default: 
      return state || {
        current_page: 0
      }
  }
}
