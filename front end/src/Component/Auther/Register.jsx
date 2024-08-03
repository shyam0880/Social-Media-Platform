import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
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
    <form onSubmit={handleRegister}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Gender</label>
        <input
          type="text"
          name="gender"
          value={user.gender}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Profile URL</label>
        <input
          type="text"
          name="profileURL"
          value={user.profileURL}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bio</label>
        <textarea
          name="bio"
          value={user.bio}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={user.date}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
