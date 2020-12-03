

export function addConstraint(first, second, relationship, offset) {
  return dispatch => {
    const constraint = { first, second, relationship, offset }
    dispatch({ type: 'ADD_CONSTRAINT', constraint })
  }
}
