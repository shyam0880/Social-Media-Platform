
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Component/Auther/Login';
import Register from './Component/Auther/Register';
import Navigation from './Navigation';
import NewsFeed from './Component/NewsFeed/NewsFeed';
import Profile from './Component/Profile/Profile';
import CreatePost from './Component/Posts/CreatePost';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <div className='nav'>
            <Navigation />
          </div>
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
    </UserProvider>
  );
}

export default App;
