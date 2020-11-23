export default function workspaceReducer(state, action) {
    switch(action.type) {
        case 'PAN_WORKSPACE': {
            return {
                ...state,
                offset: action.offset,
            }
        }
        case 'ZOOM_WORKSPACE': {
            return {
                ...state,
                scale: action.scale,
            }
        }
        default: {
            return state || {
                offset: {
                    x: 0, y: 0,
                },
                scale: 1,
            }
        }

    }
}
