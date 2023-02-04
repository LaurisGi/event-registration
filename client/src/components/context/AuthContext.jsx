import { createContext, useReducer, useEffect } from "react";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "./contexts";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type ) {
        case 'LOGIN':
            return {user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('JWT_TOKEN'))
    console.log(user)
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
      console.log(user) 
    }
  }, [])
    
    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
