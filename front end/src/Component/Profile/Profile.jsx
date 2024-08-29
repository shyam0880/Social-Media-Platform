import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './Profilecss.css';
import axios from 'axios';

const Profile = () => {
  const { user: dbUser, users, handleLogin, logout } = useContext(UserContext);
  const { userId } = useParams();
  const navigate = useNavigate();


  const user = userId ? users.find(user => user.id === parseInt(userId)) : dbUser;
  
  const [message, setMessage] = useState('');
  const [update, setUpdate] = useState(true);

  const [updateUser, setUpdateUser] = useState({
    id: '',
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
    if (user) {
      setUpdateUser({
        id: user.id,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        gender: user.gender,
        profileURL: user.profileURL,
        bio: user.bio,
        date: user.date
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({
      ...updateUser,
      [name]: value
    });
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/updateuser', updateUser);
      setMessage(response.data);
      setUpdate(!update);
      if (handleLogin) {
        handleLogin(e,updateUser.email, updateUser.password); // Ensure updated credentials
        //(e)=>{handleLogin(e,updateUser.email, updateUser.password)}
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage('Please try again.');
      }
    }finally{
      setTimeout(() => setMessage(''), 2000);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const Logout = () => {
    logout();
    navigate('/'); // Redirect to the homepage or login page
  };


  const handleUpdateButton = () => setUpdate(!update);

  const isCurrentUserProfile = user && dbUser && user.id === dbUser.id;

  return (
    <div className='profile'>      
          {update ? (
            <div className='profilebox'>
              {user && (
                <>
                  <div className='imgprofile'>
                    <div className='profileimg'>
                      <img src={user.profileURL} alt={`${user.firstName}'s avatar`} />
                    </div>
                    <div className='profilename'>
                      <h1>{user.firstName} {user.lastName}</h1>
                      <p className='bio'>{user.bio}</p>
                    </div>
                  </div>
                  <div className='profilebody'>
                    <div className='profiledetail'>
                      <div>
                        <div className='detail'>
                          <label>Email</label>
                          <p>{user.email}</p>
                        </div>
                        <div className='detail'>
                          <label>Gender</label>
                          <p>{user.gender}</p>
                        </div>
                      </div>
                      <br />
                      <div>
                        <div className='detail'>
                          <label>Role</label>
                          <p>{user.role}</p>
                        </div>
                        <div className='detail'>
                          <label>Date of birth</label>
                          <p>{user.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className='profileshow'>
                      <div className='forpost'>
                        <label>Post's</label>
                        <p>{user.posts ? user.posts.length : 0}</p>
                      </div>
                      <div className='forfollower'>
                        <label>Follower</label>
                        <p>12</p>
                      </div>
                      <div className='forfollowing'>
                        <label>Following</label>
                        <p>12</p>
                      </div>
                    </div>
                    <div className="buttons">
                      {isCurrentUserProfile? (
                        <>
                        <button type="button" onClick={handleUpdateButton}>Update</button>
                        <button type="button" onClick={Logout}>Logout</button>
                        </>
                      ):(
                        <>
                        <button type="button">FOLLOW</button>
                        <button type="button">CHAT</button> 
                        </>
                      )}
                    </div>
                    {message && <p style={{ color: 'red' }}>{message}</p>}
                  </div>
                </>
              )}
            </div>
          ) : (
            // Edit profile form when update is true
            <form onSubmit={handleProfile}>
            <div className='profilebox'>
              <div className='imgprofile'>
                <div className='profileimg'>
                  <div className="form-group">
                    <input
                      type="text"
                      name="profileURL"
                      value={updateUser.profileURL}
                      onChange={handleChange}
                      placeholder="Enter profile image url"
                    />
                  </div>
                </div>
                <div className='profilename'>
                  <input
                    type="text"
                    name="firstName"
                    value={updateUser.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={updateUser.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                  <input
                    type="text"
                    name="bio"
                    value={updateUser.bio}
                    onChange={handleChange}
                    placeholder="Bio"
                  />
                </div>
              </div>
              <div className='profilebody'>
                <div className='profiledetail'>
                  <div>
                    <div className='detail'>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={updateUser.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className='detail'>
                      <label>Gender</label>
                      <div className='row'>
                        <div className='dropdown'>
                          <select
                            id="gender"
                            name="gender"
                            value={updateUser.gender}
                            onChange={handleChange}
                          >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div>
                    <div className='detail'>
                      <label>Role</label>
                      <div className='row'>
                        <div className='dropdown'>
                          <select
                            id="role"
                            name="role"
                            value={updateUser.role}
                            onChange={handleChange}
                          >
                            <option value="">Select your role</option>
                            <option value="User">User</option>
                            <option value="Influencer">Influencer</option>
                            <option value="Business Account">Business Account</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='detail'>
                      <label>Date of birth</label>
                      <input
                        type="date"
                        name="date"
                        value={updateUser.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='profileshow'>
                  <div className='forpost'>
                    <label>Post's</label>
                    <p>{user.posts ? user.posts.length : 0}</p>
                  </div>
                  <div className='forfollower'>
                    <label>Follower</label>
                    <p>12</p>
                  </div>
                  <div className='forfollowing'>
                    <label>Following</label>
                    <p>12</p>
                  </div>
                </div>
                <div className="buttons">
                  <button className="register-button" type="submit">Update</button>
                  <>
                  <button className="register-button" type="button" onClick={handleUpdateButton}>Cancel</button>
                  </>
                </div>
              </div>
            </div>            
            </form>
          )}
    </div>
  );
};

export default Profile;
