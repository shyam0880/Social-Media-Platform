import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './Profilecss.css';

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  //console.log("data : "+user.profileURL);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className='profile'>
      <div className='profilebox'>
        <div className='imgprofile'>
          <div className='profileimg'>
            <img src={user.profileURL} typeof='img' alt={`${user.firstName}'s avatar`} />
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
            <br/>
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
              <p>12</p>
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
                  <button>CHAT</button>
                  <button>FOLLOW</button>
          </div>
          {/* Add more profile details as needed */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
