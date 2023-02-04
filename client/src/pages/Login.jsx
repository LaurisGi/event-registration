import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../components/context/contexts";
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { useLogin } from '../hooks/useLogin';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin()

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password)

//   fetch(`${process.env.REACT_APP_API_URL}/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       email,
//       password
//     })
//     })
//   .then((res) => {
//     if (res.status === 400 || res.status === 500) {
//       return res.json().then(({ message }) => {
//         setError(message);
//         throw new Error(message);
//       });
//     }
  
//     if (!res.ok) {
//       throw new Error('Something went wrong');
//     }
//     return res.json();
//   })
//   .then((data)=> {
//     const { token, id, email } = data;
//     localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
//     setIsLoading(false);
//     setUser({id, email})
//     navigate('/postlogin');
//   })
//   .catch((e) => {
//     setError(e.message);
//     setIsLoading(false);
// })
}
  return (
    <>
    <form onSubmit={handleLogin}>
      <Input
      placeholder="Email"
      type="email"
      onChange={ (e) => setEmail(e.target.value)}
      value={email}
      />
      <Input
      placeholder="Password"
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      required
      />
        {error && <div>{error}</div>}
      <Button type="submit" dissabled={isLoading}>Log In</Button>
    </form>
    </>
  )
}
