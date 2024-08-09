//import React, { useState, useContext } from 'react';
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { UserContext } from '../../UserContext';
import CreatePost from '../Posts/CreatePost';
import { useNavigate } from 'react-router-dom';
import NewsFeed from './NewsFeed';
import UserLists from '../Posts/UserList';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
        const response1 = await axios.get(`http://localhost:8080/api/post/findallpost`);
        setPosts(response1.data);
        const response2 = await axios.get(`http://localhost:8080/api/users/findAllUsers`);
        setUsers(response2.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the newsfeed", error);
      setError('Failed to load posts');
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

 if (error) {
   return <div>{error}</div>; 
 }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className='homepage'>
      <div className='users-list'>
        <h1>Recent</h1>
      </div>
      <div className="newsfeed-container">
        <div className='createpost'>
          <CreatePost refpost={fetchPosts} />
        </div>
        <div className='feedhead'>
          <h1>News Feed</h1>
        </div>
        <div className='feedbody'>
          <NewsFeed posts={posts} users={users}/>
        </div>
      </div>
      <div className='users-list'>
        <div>
          <h1>User List</h1>
        </div>
        <br/>
        <div className="users">
          <ul>
            <UserLists users={users} />
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
