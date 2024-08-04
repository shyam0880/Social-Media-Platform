import React, { useContext } from 'react';
//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("data"+user);
  //const { userId } = useParams();
  //const [user, setUser] = useState(null);
  //const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(`/api/users/${userId}`);
  //       setUser(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching the user profile", error);
  //     }
  //   };

  //   fetchUser();
  // }, [userId]);

  if (!user) {
    // Redirect to login page if not logged in
    navigate('/login');
    return null;
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }


  return (
    <div>
      <h1>{user.firstName} {user.lastName}'s Profile</h1>
      <img src={user.profileURL} alt={`${user.firstName}'s avatar`} />
      <p>Email : {user.email}</p>
      <p>Gender : {user.gender}</p>
      <p>Role : {user.role}</p>
      <p>About me: {user.bio}</p>
      <p>Date of birth : {user.date}</p>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default Profile;
