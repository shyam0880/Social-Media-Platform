import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Registercss.css';

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
    gender: '',
    profileURL: '',
    bio: '',
    date: ''
  });
  
  useEffect(() => {
    const profileURLs = {
      male: 'https://shorturl.at/1MpKy',
      female: 'https://shorturl.at/w7OzW',
      'prefer-not-to-say': 'https://shorturl.at/GL47y'
    };

    setUser(prevState => ({
      ...prevState,
      profileURL: profileURLs[user.gender] || 'https://shorturl.at/GL47y' // Default URL
    }));
  }, [user.gender]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });

    if (name === 'password') {
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if(value===""){
        setPasswordMessage('');
      } else if (!passwordPattern.test(value)) {
        setPasswordMessage(
          'Minimum 6 char, one uppercase, lowercase, digit, and special character.'
        );
      } else{
        setPasswordMessage('Password is correct!');
      }
    }
    
  };


  const handleRegister = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', user);
      setMessage(response.data)
      if(response.status===201){
        navigate('/login')
      }
    } catch (error) {
      if(error.response && error.response.data){
        setMessage(error.response.data)
      } else {
        setMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className='registerpage'>
      <form class="register-form" onSubmit={handleRegister}>
    <h2>Register</h2>
    <div className='row'>
      <div class="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          required
        />
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          required
        />
      </div>
    </div>
    <div className='row'>
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        {passwordMessage && (<p style={{ color: passwordMessage === 'Password is correct!' ? 'green' : 'red' }}>{passwordMessage}</p>)}
      </div>
    </div>
    
    <div class="form-group">
      <label>Gender</label>
      <div className='row'>
        <div className='radiobtn'>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              checked={user.gender === "male"}
              required
            />
            Male
          </label>
        </div>
        <div className='radiobtn'>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              checked={user.gender === "female"}
              required
            />
            Female
          </label>
        </div>
        <div className='radiobtn'>
          <label>
            <input
              type="radio"
              name="gender"
              value="prefer-not-to-say"
              onChange={handleChange}
              checked={user.gender === "prefer-not-to-say"}
              required
            />
            Prefer not to say
          </label>
        </div>
      </div>
    </div>
    
    <div class="form-group">
      <label>Date</label>
      <input
        type="date"
        name="date"
        value={user.date}
        onChange={handleChange}
        required
      />
    </div>
    <button class="register-button" type="submit">Register</button>
    <div class="login-link">
      <br/>
      {message && <p style={{color:"red"}}>{message}</p>}
      <hr/>
      <br/>
      <div className='changebutton'>
        <Link to="/login" className='login-button'>Login</Link>
      </div>
    </div>
      </form>
    </div>

  );
};

export default Register;
