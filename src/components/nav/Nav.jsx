import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './nav.css';

const Nav = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleSignInClick = () => {
    loginWithRedirect();
  };

  const handleSignUpClick = () => {
    // Check if the user is authenticated before logging out
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else {
      // Handle sign-up logic here if the user is not authenticated
      // For example, you can redirect the user to a sign-up page.
    }
  };

  return (
    <div className='nav_bar'>
      <p className='welcome_msg'>Welcome To Vehiclo!!</p>
      <div className='buttons'>
        <div>
          <button onClick={() => { /* Handle reservation logic here */ }} className='reservation'>Make Reservation</button>
        </div>
        <div>
          <button onClick={handleSignInClick} className='login_button'>Sign in</button>
        </div>
        <div>
          <button onClick={handleSignUpClick} className='signup_button'>
            {isAuthenticated ? 'Sign Out' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
