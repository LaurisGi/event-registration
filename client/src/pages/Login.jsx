import React from 'react'
import { Button } from '../components/Button/Button'
import { Input } from '../components/Input/Input'
import { useState } from 'react'


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

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
    return res.json();
  })
  .then((data)=> {
    console.log(data);
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
      value={password}
      />
      <Button>Log In</Button>
    </form>
    </>
  )
}
