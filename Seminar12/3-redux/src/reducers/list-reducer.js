const INITIAL_STATE = {
    notes: []
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_NOTE':
            return { ...state, notes: [...state.notes, action.payload] }
            //Ex.3
        case 'DELETE_NOTE':
            return {...state, notes: state.notes.slice(0,-1)}
        default:
            return state;
    }
}