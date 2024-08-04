import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './NewsFeed.css';
import { UserContext } from '../../UserContext';


const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added state for error handling
  const { user } = useContext(UserContext);
  //const user = 2; // This should be dynamically set based on the logged-in user
  


  useEffect(() => {
    const fetchPosts = async () => {
      try {
          //const response = await axios.get(`http://localhost:8080/api/user/${user.id}`);
          const response = await axios.get(`http://localhost:8080/api/post/findallpost`);
          console.log(response.data.id) // Log the response data
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


  if (!user) {
    return <div>Login First...</div>;
 }

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
            <li key={post.id} className="post">
              <p>Posted by {post.fullName}</p>
              <small>Posted on: {new Date(post.createDate).toLocaleString()}</small>
              <p>{post.content}</p>
              <div className="buttons">
                <button>Like</button>
                <button className="comment">Comment</button>
                <button className="share">Share</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsFeed;
