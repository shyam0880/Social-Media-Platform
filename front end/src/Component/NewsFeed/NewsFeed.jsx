import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './NewsFeed.css';
import { UserContext } from '../../UserContext';
import Login from '../Auther/Login';
import CreatePost from '../Posts/CreatePost';


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
  const finduser=(userid)=>{
    const user = users.find(user => user.id === userid);
    return user.profileURL;
  }

  return (
    <div className='homepage'>
      <div className='users-list'>
        <h1>Recent</h1>
      </div>
      <div className="newsfeed-container">
        <div className='createpost'>
          <CreatePost />
        </div>
        <div className='feedhead'>
          <h1>News Feed</h1>
        </div>
        <div className='feedbody'>
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            <ul className="post-list">
              {posts.map(post => (
                <li key={post.id} className="post">
                  <div className="postuser">
                    <div className='userimg'>
                      <img src={finduser(post.authorId)} alt={users.fullName} />
                    </div>
                    <div className='userbody'>
                      <p>{post.fullName}</p>
                      <small>Posted on: {new Date(post.createDate).toLocaleString()}</small>
                    </div>
                  </div>
                  <div className='content'>
                    <p>{post.content}</p>
                  </div>
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
      </div>
      <div className='users-list'>
        <div>
          <h1>User List</h1>
        </div>
        <br/>
        <div className="users">
          <ul>
              {users.map(users => (
                <li key={users.id} className="eachuser">
                  <div className='userimg'>
                    <img src={users.profileURL} alt={users.fullName} />
                  </div>
                  <div className='userbody'>
                    <p>{users.firstName+" "+users.lastName}</p>
                  </div>
                  <div className="buttons">
                    <button>Follow</button>
                  </div>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
