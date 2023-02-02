import React from 'react';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../components/contexts/contexts";
import { UserContext } from '../components/contexts/UserContextWrapper';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

  fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
    })
  .then((res) => {
    if (res.status === 400 || res.status === 500) {
      return res.json().then(({ message }) => {
        setError(message);
        throw new Error(message);
      });
    }
  
    if (!res.ok) {
      throw new Error('Something went wrong');
    }
    return res.json();
  })
  .then((data)=> {
    const { token, id, email } = data;
    localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
    setIsLoading(false);
    setUser({id, email})
    navigate('/postlogin');
  })
  .catch((e) => {
    setError(e.message);
    setIsLoading(false);
})
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
