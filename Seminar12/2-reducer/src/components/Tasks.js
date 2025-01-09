
import { useReducer } from "react";

const initialState = { count: 0, history: [0] }

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return {
                history: [...state.history, state.count + 1],
                count: state.count + 1
            };
        case 'decrement':
            return {
                history: [...state.history, state.count - 1],
                count: state.count - 1
            }
        //Ex2.
        case 'reset':
            return initialState;
        default:
            throw Error('Invalid action');
    }
}

const Tasks = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state)
    return (
        <>
            <p>Tasks, count: {state.count}, history: {state.history.join(',')}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset State</button>
        </>
    )
}

export default Tasks;