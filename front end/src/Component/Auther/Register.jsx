import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Registercss.css';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
    gender: '',
    profileURL: 'https://shorturl.at/1MpKy',
    bio: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', user);
      alert(response.data.firstName+' is register successcuffy')
      //window.location.reload();
      // Handle registration success (e.g., redirect to login)
      navigate('/login')
    } catch (error) {
      alert('Registration failed', error);
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
      </div>
    </div>
    
    <div class="form-group">
      <label>Gender</label>
      <div className='row'>
        <div className='radiobtn'>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
            checked={user.gender === "male"}
            required
          />
          Male
        </div>
        <div className='radiobtn'>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
            checked={user.gender === "female"}
            required
          />
          Female
        </div>
        <div className='radiobtn'>
          <input
            type="radio"
            name="gender"
            value="prefer-not-to-say"
            onChange={handleChange}
            checked={user.gender === "prefer-not-to-say"}
            required
          />
          Prefer not to say
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
