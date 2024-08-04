import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './NewsFeed.css';
import { UserContext } from '../../UserContext';
import Login from '../Auther/Login';


const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added state for error handling
  const { user } = useContext(UserContext);
  //const user = 2; // This should be dynamically set based on the logged-in user
  


  useEffect(() => {
    const fetchPosts = async () => {
      try {
          //const response = await axios.get(`http://localhost:8080/api/user/${user.id}`);
          const response1 = await axios.get(`http://localhost:8080/api/post/findallpost`);
          setPosts(response1.data);
          const response2 = await axios.get(`http://localhost:8080/api/users/findAllUsers`);
          setUsers(response2.data);
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
    return <Login />;
 }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }

  return (
    <div className='homepage'>
      <div className='users-list'>
        <h1>Recent</h1>
      </div>
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
      <div className='users-list'>
        <h1>User List</h1>
        <br/>
        <ul className="post-list">
            {users.map(users => (
              <li key={users.id} className="post">
                <p>{users.firstName+" "+users.lastName}</p>
                <div className="buttons">
                  <button>Follow</button>
                </div>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default NewsFeed;
