export default function createListReducer(actions) {
  return function(state, action) {
    switch(action.type) {
      case actions.add: {
        return {
          allIds: state.allIds.concat([state.nextId]),
          byId: {
            ...state.byId,
            [state.nextId]: {
              ...action.data,
            },
          },
          nextId: state.nextId + 1,
        }
      }
      case actions.remove: {
        const i = state.allIds.indexOf(action.data.id);
        console.log('actions.remove state: ', state);
        console.log('actions.remove action: ', action);
        console.log('actions.remove i: ', i);
        const byId = { ...state.byId };
        delete byId[action.data.id];
        return {
          ...state,
          allIds: state.allIds.slice(0, i).concat(state.allIds.slice(i + 1)),
          byId,
        }
      }
      case actions.update: {
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.data.id]: {
              ...state.byId[action.data.id],
              ...action.data,
            }
          }
        } 
      }
      case actions.load: {
        return action.data
      }
      default: {
        return state || {
          byId: { },
          allIds: [],
          nextId: 0,
        }
      }
    }
  }
}
