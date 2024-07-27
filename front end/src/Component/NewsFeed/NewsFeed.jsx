import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsFeed.css';


const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added state for error handling
  //const userId = 2; // This should be dynamically set based on the logged-in user

  useEffect(() => {
    const fetchPosts = async () => {
      try {
          //const response = await axios.get(`/api/newsfeed?userId=${userId}`);\
          const response = await axios.get(`http://localhost:8080/api/post/getallpost`);
          console.log(response.data); // Log the response data
          setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the newsfeed", error);
        setError('Failed to load posts'); // Set error state
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }

  return (
    <div className="newsfeed-container">
      <h1>Newsfeed</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul className="post-list">
          {posts.map(post => (
            <li key={post.id} className="post-item">
              <p>{post.content}</p>
              <small>Posted on: {new Date(post.createDate).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsFeed;
