import React, { useContext} from 'react'

import { UserContext } from '../../UserContext';

const UserLists=()=> {
  const { user, users } = useContext(UserContext);

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

export default UserLists
