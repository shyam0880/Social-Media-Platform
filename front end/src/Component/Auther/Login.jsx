import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './logincss.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/validate', { email, password });
      login(response.data);
      
      // Check response status
      if (response.status === 200) {
        navigate('/profile'); // Navigate to newsFeed if login is successful
      } else {
        alert('Login failed: ' + response.data); // Display error message
      }

    } catch (error) {
      console.error('Login failed', error);
      alert('An error occurred during login. Please try again.'); // Display generic error message
    }
  };

  return (
    <div className='loginpage'>
      <form onSubmit={handleLogin} className='login-form'>
        <div className='userlogo'>
            <img src='https://shorturl.at/1MpKy'typeof='img' alt={`USER`} />
        </div>
        <div className='loginbox'>
          <div>
            {/* <label>Username (Email)</label> */}
            <input
              type="email"
              value={email}
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br/>
          <div>
            {/* <label>Password</label> */}
            <input
              type="password"
              value={password}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br/>
          <button type="submit">Login</button>
          <br/><br/>
          <hr/>
          <br/>
          <div className='changebutton'>
            <Link to="/register" className='login-button'>Register</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
