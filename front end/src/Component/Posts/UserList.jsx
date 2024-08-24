import React, { useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const UserLists=()=> {
  const { user, users } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <ul>
        {users
        .filter(users=>users.id!==user.id)
        .map(users => (
        <li key={users.id} className="eachuser" onClick={() => handleUserClick(users.id)} style={{ cursor: 'pointer' }}>
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

export default UserLists
