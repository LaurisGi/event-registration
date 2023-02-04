import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem('JWT_TOKEN');
        console.log(localStorage.key)
        dispatch({type: 'LOGOUT'})
    }

    return {logout}

}