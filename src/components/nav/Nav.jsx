import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook
import './nav.css';

const Nav = () => {
  const { loginWithRedirect } = useAuth0(); // Get the loginWithRedirect function

  const handleSignInClick = () => {
    // Use loginWithRedirect to initiate the login process and redirect to Auth0 login page
    loginWithRedirect();
  };

  return (
    <div className='nav_bar'>
      <p className='welcome_msg'>Welcome To Vehiclo!!</p>

      <div className='buttons'>
        <div>
          <button onClick={handleSignInClick} className='login_button'>Sign in</button>
        </div>

        <div>
          <button onClick={() => { /* Handle sign-up logic here */ }} className='signup_button'>Sign UP</button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
