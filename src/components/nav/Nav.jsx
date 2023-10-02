import React from 'react';
import './nav.css';


const Nav = () => {
  return ( 
    <div className='nav_bar'>
      <p className='welcome_msg'>Welcome To Vehiclo!!</p>

      <div className='buttons'>
        <div>
          <button onclick="#" className='login_button'>Sign in</button>
        </div>

        <div> 
          <button onclick="#" className='signup_button'>Sign UP</button>
        </div>
      </div>
    </div>
  )
}

export default Nav