import React, { useContext } from 'react';
import './Home.css';
import { UserContext } from '../UserContext';
import CreatePost from '../Component/Posts/CreatePost';
//import { useNavigate } from 'react-router-dom';
import NewsFeed from '../Component/NewsFeed/NewsFeed';
import UserLists from '../Component/Posts/UserList';
import Login from '../Component/Auther/Login';


const Home = () => {
  const { loading, error, user } = useContext(UserContext);
  //const navigate = useNavigate();

  if (!user) {
    return <Login />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

 if (error) {
   return <div>{error}</div>; 
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
        </div>
      </div>
      <div className='users-list'>
        <div>
          <h1>User List</h1>
        </div>
        <br/>
        <div className="users">
          <ul>
            <UserLists />
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
