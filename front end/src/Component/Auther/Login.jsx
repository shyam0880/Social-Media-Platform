import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './logincss.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/validate', { email: username, password });
      login(response.data);
      
      // Check response status
      if (response.status === 200) {
        console.log(response.data); // Optionally log the success message
        navigate('/profile'); // Navigate to newsFeed if login is successful
      } else {
        console.error('Login failed: ', response.data);
        alert('Login failed: ' + response.data); // Display error message
      }

    } catch (error) {
      console.error('Login failed', error);
      alert('An error occurred during login. Please try again.'); // Display generic error message
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username (Email)</label>
        <input
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
