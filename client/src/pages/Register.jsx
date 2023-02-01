import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';

export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleRegister = (e) => {
      e.preventDefault();

      fetch(`${process.env.REACT_APP_API_URL}/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, surname, email, password })
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
      .then((data) => {
        navigate('/login');
        console.log(data)
      })
      .catch((e) => {
        setError(e.message);
      });
  };
  
    return (
        <>
        <form onSubmit={handleRegister}>
          <Input
          placeholder='Name'
          required
          onChange={(e)=> setName(e.target.value)}
          value={name}
          />
          <Input
          placeholder='Surname'
          required
          onChange={(e)=> setSurname(e.target.value)}
          value={surname}
          />
          <Input
          placeholder='Email'
          required
          type="email"
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
          />
          <Input
          placeholder='Password' 
          required
          type="password"
          onChange={(e)=> setPassword(e.target.value)}
          value={password}
          />
             {error && <div>{error}</div>}
          <Button>Register</Button>
        </form>
        <Link to="/login">Login</Link>
        </>
      )
    }