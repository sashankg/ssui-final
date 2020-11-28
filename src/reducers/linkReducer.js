export default function linkReducer(state, action) {
    switch(action.type) {
        case 'START_LINK':
            return {
                state: 'linking',
                first: action.item,
                position: action.position,
            }
        case 'FINISH_LINK':
            return {
                ...state,
                state: 'linked',
                second: action.item,
            }
        case 'CANCEL_LINK':
            return {
                state: 'emtpy'
            }
        default: 
            return state || {
                state: 'empty', //empty, linking, linked
            }
    }
}
