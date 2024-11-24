// src/components/SignupAndLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import
import './Style.css';

const SignupAndLogin = () => {
  const [isLogin, setIsLogin] = useState(true); // Default to login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup'; 
      const response = await axios.post(url, { username, password });
  
      if (isLogin) {
        console.log('Login successful:', response.data);
        navigate('/dashboard');
      } else {
        console.log('Signup successful');
        navigate('/login');
      }
    } catch (err) {
      setError('Error: ' + (err.response ? err.response.data : 'Unknown error'));
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </p>
    </div>
  );
};

export default SignupAndLogin;