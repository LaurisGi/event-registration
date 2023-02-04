import { useState } from "react";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setisLoading] = useState(null);

    const register = async (name, surname, email, password) => {
        setisLoading(true)
        setError(null)

        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, surname, email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setisLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            setError(json.message)
            setisLoading(false)
        }
    }

    return { register, isLoading, error }
}