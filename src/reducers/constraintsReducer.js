export default function constraintsReducer(state, action) {
  switch(action.type) {
    case 'ADD_CONSTRAINT':
      return state.concat([action.constraint]);
    default:
      return state || [];
  }
}
