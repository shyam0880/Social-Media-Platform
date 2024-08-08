import React,{useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../src/UserContext';

function Navigation() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const Logout = () => {
    logout();
    navigate('/'); // Redirect to the homepage or login page
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={Logout}>LogOut</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
