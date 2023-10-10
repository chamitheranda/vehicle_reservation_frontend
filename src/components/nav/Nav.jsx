import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react'; 
import './nav.css';
import logo from './logo.png'

const Nav = (props) => {
  const {handleSignOutClick , handleSignInClick} = props
  const { state } = useAuthContext(); 

  return (
    <div className='nav_bar'>
      <p className='welcome_msg'>Welcome To Vehiclo!!</p>
      <div className='contain'>
        <div className='logo-cont'>
           <img src={logo} alt="logo" className='logo'/>
        </div>
        <div className='cont1'>
          <div>
            <p>Vehiclo: Established in 2003, we bring a decade of unparalleled expertise to vehicle services. With a deep commitment to quality and customer satisfaction, we offer a wide range of services, from routine maintenance to advanced diagnostics and custom upgrades. Your vehicle is not just transportation; it's an investment. At Vehiclo, we treat it with precision, using high-quality parts and a dedicated team of skilled technicians. Experience the Vehiclo difference and trust us as your partner for optimal vehicle performance, longevity, and safety.</p>
          </div>
          <div className='buttons'>      
            <div>
              <button onClick={handleSignInClick} className='login_button'>Sign In</button>
            </div>
            <div>
              <button onClick={handleSignOutClick} className='signup_button'>
                {state.isAuthenticated ? 'Sign Out' : 'Get Start'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;

