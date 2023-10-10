import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react'; 
import './nav.css';

const Nav = (props) => {
  const {handleSignOutClick , handleSignInClick} = props
  const { state } = useAuthContext(); 

  return (
    <div className='nav_bar'>
      <p className='welcome_msg'>Welcome To Vehiclo!!</p>
      <div className='buttons'>
       
        <div>
          <button onClick={handleSignInClick} className='login_button'>Sign in</button>
        </div>
        <div>
          <button onClick={handleSignOutClick} className='signup_button'>
            {state.isAuthenticated ? 'Sign Out' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;

