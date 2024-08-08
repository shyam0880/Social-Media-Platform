//import React, { useState, useContext } from 'react';
import React, { useContext } from 'react';
import './Home.css';
import { UserContext } from '../../UserContext';
import CreatePost from '../Posts/CreatePost';
import { useNavigate } from 'react-router-dom';
import NewsFeed from './NewsFeed';
import PostLists from '../Posts/PostLists';


const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();


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
          <CreatePost />
        </div>
        <div className='feedhead'>
          <h1>News Feed</h1>
        </div>
        <div className='feedbody'>
          <NewsFeed />
          {/* {posts.length === 0 ? (
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
          )} */}
        </div>
      </div>
      <div className='users-list'>
        <div>
          <h1>User List</h1>
        </div>
        <br/>
        <div className="users">
          <ul>
            <PostLists />
              {/* {users.map(users => (
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
              ))} */}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
