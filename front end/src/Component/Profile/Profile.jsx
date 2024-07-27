import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the user profile", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <img src={user.avatar} alt={`${user.username}'s avatar`} />
      <p>{user.bio}</p>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default Profile;
