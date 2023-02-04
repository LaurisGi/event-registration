import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../components/context/contexts";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
        const { token, id, email } = json;
            localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
            setError(json.message)

            dispatch({type: 'LOGIN', payload: json})
            navigate('/postlogin')
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}
