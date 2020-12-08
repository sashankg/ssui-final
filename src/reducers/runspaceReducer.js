export default function runspaceReducer(state, action) {
  switch(action.type) {
    case 'CHANGE_PAGE':
      return {
        ...state,
        current_page: action.data.current_page
      }
    case 'RESIZE_PAGE_WIDTH':
      return {
        ...state,
        page_width: action.data.page_width
      }
    case 'RESIZE_PAGE_HEIGHT':
      return {
        ...state,
        page_height: action.data.page_height
      }
    default: 
      return state || {
        current_page: 0,
        page_width: 500,
        page_height: 500
      }
  }
}
