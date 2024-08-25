import React, { useState, useContext } from 'react';
//import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './logincss.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [message, setMessage] = useState('');
  // const navigate = useNavigate();
  const { handleLogin, loginMessage } = useContext(UserContext);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:8080/api/users/validate', { email, password });
  //     login(response.data);
      
  //     // Check response status
  //     if (response.status === 200) {
  //       navigate('/profile'); // Navigate to newsFeed if login is successful
  //     } else {
  //       alert('Login failed: ' + response.data); // Display error message
  //     }

  //   } catch (error) {
  //     if(error.response && error.response.data){
  //       setMessage(error.response.data);
  //     }
  //     else{
  //       setMessage('Login failed. Please try again.');
  //     }
  //   }
  // };
  const handlePWView=()=>{
    const pwd = document.getElementById('pwd'); 
    if(pwd.type === 'password'){
      pwd.type = 'text';
      } else{
        pwd.type = 'password';
      }
  }

  return (
    <div className='loginpage'>
      <form onSubmit={(e)=>{handleLogin(e,email, password)}} className='login-form'>
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
              id='pwd'
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br/>
          <input type="checkbox" id='chk' onClick={handlePWView}/>Show Password
          <br/>
          <br/>
          <button type="submit">Login</button>
          <br/>
          {loginMessage && <p style={{color:"red"}}>{loginMessage}</p>}
          <br/>
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
