import React, { useState } from 'react';
import axios from 'axios';

const FollowButton = ({ userId, followId, isFollowing, onFollowChange }) => {
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8080/api/users/${userId}/follow/${followId}`);
      console.log(response.data);
      onFollowChange(true);
    } catch (error) {
      console.error('Failed to follow user', error);
    }
    setLoading(false);
  };

  const handleUnfollow = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8080/api/users/${userId}/unfollow/${followId}`);
      console.log(response.data);
      onFollowChange(false);
    } catch (error) {
      console.error('Failed to unfollow user', error);
    }
    setLoading(false);
  };

  return (
    <button onClick={isFollowing ? handleUnfollow : handleFollow} disabled={loading}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
