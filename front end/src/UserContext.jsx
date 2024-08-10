import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true); 

  //fetching data
  const fetchPosts = async () => {
    try {
      //fetch
      const [response1, response2] = await Promise.all([axios.get(`http://localhost:8080/api/post/findallpost`),axios.get(`http://localhost:8080/api/users/findAllUsers`)]) 
      //set state
      setPosts(response1.data);
      setUsers(response2.data);
      //save on local storage with variable
      localStorage.setItem('posts', JSON.stringify(response1.data));
      localStorage.setItem('users', JSON.stringify(response2.data));
      setLoading(false);
      localStorage.setItem('loading', 'false');
      setError(null);
      localStorage.removeItem('error');
    } catch (error) {
      const storedPosts = JSON.parse(localStorage.getItem('posts'));
      const storedUsers = JSON.parse(localStorage.getItem('users'));

      if (!storedPosts || storedPosts.length === 0 || !storedUsers || storedUsers.length === 0) {
        setError('Failed to load posts');
        localStorage.setItem('error', 'Failed to load posts');
      }
      
      setLoading(false);
      localStorage.setItem('loading', 'false');
    }
  };


  //helps to check while loading whether localstorage have data if trye then set on user
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) setUser(userData);

    const userList = JSON.parse(localStorage.getItem('users')) || [];
    if (userList.length > 0) {
      setUsers(userList);
      setError(null); // Clear error if data found in localStorage
    }

    const postList = JSON.parse(localStorage.getItem('posts')) || [];
    if (postList.length > 0) {
      setPosts(postList);
      setError(null); // Clear error if data found in localStorage
    }

    const loading = JSON.parse(localStorage.getItem('loading')) || false;
    setLoading(loading);
    
    const error = localStorage.getItem('error');
    if (error) setError(error);
    
  }, []);

  //set the user datawhile login
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    fetchPosts();
  };

  //clear user data from localStorage 
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ users, posts, loading, error, user,fetchPosts, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
