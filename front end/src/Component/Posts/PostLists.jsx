import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';

import { UserContext } from '../../UserContext';

const PostLists=()=> {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added state for error handling
  const { user } = useContext(UserContext);

  


  useEffect(() => {
    const fetchPosts = async () => {
      try {
          const response2 = await axios.get(`http://localhost:8080/api/users/findAllUsers`);
          setUsers(response2.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the newsfeed", error);
        setError('Failed to load posts'); 
        setLoading(false); 
      }
    };
    fetchPosts();
  }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>; // Show error message if there's an error
    }

  return (
    <ul>
        {users
        .filter(users=>users.id!==user.id)
        .map(users => (
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
  )
}

export default PostLists
