import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';

function Navigation() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <nav className='navbar'>
        <div className='navlogo'>
        <img src="https://shorturl.at/WTT2u" alt='logo' />
        </div>
        <div className='navitem'>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        <div className='navprofile'>
        
        <Link to="/profile"><img src={user.profileURL} alt='logo' /></Link>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
