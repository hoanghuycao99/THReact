import { useReducer } from "react";
import Context from "./context";
import reducer, { initState } from './reducer'

function Provider({ Children }) {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {Children}
        </Context.Provider>
    )
}

export default Provider