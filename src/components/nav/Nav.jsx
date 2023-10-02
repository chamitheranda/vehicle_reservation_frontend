import React from 'react';
import './nav.css';

const Nav = () => {
  const handleSignInClick = () => {
    window.location.href = 'http://localhost:8080/swagger-ui.html';
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
