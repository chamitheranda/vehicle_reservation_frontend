import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react'; // Import Asgardeo hook
import './nav.css';



const Nav = (props) => {
  const {toggleForm} = props
  const { signIn, signOut, state } = useAuthContext(); 

  const handleSignInClick = () => {
    if(state.isAuthenticated){
      alert("You are already logged in !!!")
    } else{
      signIn();
    }  
  };

  const handleSignUpClick = () => {
    if (state.isAuthenticated) {
      if (window.confirm('Are you sure you want to log out?')) {
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        signOut();
      }
    } else {
    }
  };


  return (
    <div className='nav_bar'>
      <p className='welcome_msg'>Welcome To Vehiclo!!</p>
      <div className='buttons'>
       
        <div>
          <button onClick={handleSignInClick} className='login_button'>Sign in</button>
        </div>
        <div>
          <button onClick={handleSignUpClick} className='signup_button'>
            {state.isAuthenticated ? 'Sign Out' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;

