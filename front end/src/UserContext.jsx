import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

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
      localStorage.setItem('loading', 'false');
      localStorage.removeItem('error');
      setError(null);
    } catch (error) {
      const storedPosts = JSON.parse(localStorage.getItem('posts'));
      const storedUsers = JSON.parse(localStorage.getItem('users'));

      // if (!storedPosts || storedPosts.length === 0 || !storedUsers || storedUsers.length === 0) {
      //   setError('Failed to load posts');
      //   localStorage.setItem('error', 'Failed to load posts');
      // }

      if (!storedPosts?.length || !storedUsers?.length) {
        setError('Failed to load data');
        localStorage.setItem('error', 'Failed to load data');
      }else {
        setPosts(storedPosts);
        setUsers(storedUsers);
        setError(null); // No error if fallback data is used
      }
    } finally {
      setLoading(false); // Ensure loading is set to false in both cases
    }
  };

  


  //helps to check while loading whether localstorage have data if trye then set on user
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) setUser(userData);

    const postList = JSON.parse(localStorage.getItem('posts')) || [];
    const userList = JSON.parse(localStorage.getItem('users')) || [];
    if (postList.length && userList.length) {
      setPosts(postList);
      setUsers(userList);
      setError(null);
    }

    const loadingState = JSON.parse(localStorage.getItem('loading')) || false;
    setLoading(loadingState);

    const storedError = localStorage.getItem('error');
    if (storedError) setError(storedError);

  }, []);

  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/validate', { email, password });
      // Check response status
      if (response.status === 200) {
        login(response.data);
        navigate('/profile'); // Navigate to newsFeed if login is successful
      } else {
        alert('Login failed: ' + response.data); // Display error message
      }

    } catch (error) {
      if(error.response && error.response.data){
        setLoginMessage(error.response.data);
      }
      else{
        setLoginMessage('Login failed. Please try again.');
      }
    }
    finally{
      setTimeout(() => setLoginMessage(''), 2000);
    }
  };


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
    <UserContext.Provider value={{ users, posts, loading, error, user, loginMessage, fetchPosts, handleLogin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
