
import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './Component/Auther/Login';
import Register from './Component/Auther/Register';
import Navigation from './Component/Nav/Navigation';
import NewsFeed from './Pages/Home';
import Profile from './Component/Profile/Profile';
import { UserContext } from './UserContext';
//import UserProfile from './Component/Profile/UserProfile';


function App() {
  const { user } = useContext(UserContext);
  
  return (
      <>
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
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/" element={<NewsFeed />} />
            </Routes>
          </div>
        </div>
      </>
  );
}

export default App;
