import { useReducer, createContext } from "react"
import { reducer } from './reducer.jsx'

export const ContextProvider = createContext(null)

const initialValue = {
    userData: {},
    resources: [],
    isLoading: false,
    targetId: undefined,
}

export const Context = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialValue);

    // получение данных пользователя
    state.setUserData = (data) => {
        dispatch({ type: "SET_USER_DATA", payload: data })
    }

    //состояние загрузки
    state.setIsLoading = (value) => {
        dispatch({ type: "SET_IS_LOADING", payload: value })
    }

    //состояние объектов таблицы
    state.setResources = (data) => {
        dispatch({ type: "SET_RESOURCES", payload: data })
    }

    state.setTargetId = (data) => {
        dispatch({ type: "SET_TARGET_ID", payload: data })
    }

    state.setIsAdmin = (data) => {
        dispatch({type: "SET_IS_ADMIN", payload: data})
    }


    return (
        <ContextProvider.Provider value={state}>
            {children}
        </ContextProvider.Provider >
    )
}