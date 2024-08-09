
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Component/Auther/Login';
import Register from './Component/Auther/Register';
import Navigation from './Navigation';
import NewsFeed from './Pages/Home';
import Profile from './Component/Profile/Profile';
import CreatePost from './Component/Posts/CreatePost';
import { UserContext } from './UserContext';


function App() {
  const { user } = useContext(UserContext);
  
  return (
      <Router>
        <div className="App">
        {user && (
            <div className='nav'>
              <Navigation />
            </div>
        )}
          <div className='container'>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-post" element={<CreatePost />} />
              {/* <Route path="/posts" element={<PostList />} /> */}
              <Route path="/" element={<NewsFeed />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
