import React, { useState, useEffect } from 'react';
import { Form, Nav , NavBar , Dashboard , ReservationList , FutureRes} from './components'; // Import your Form and Nav components
import './App.css';
import { AuthProvider, useAuthContext } from '@asgardeo/auth-react'; // Import Asgardeo authentication components
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';



const App = () => {
  return (
    <AuthProvider
      config={{
        clientID: "1QtNSlVCszLaL2701bpo9S_f_sIa", // Replace with your Asgardeo clientID
        baseUrl: "https://api.asgardeo.io/t/orgueejs", // Replace with your Asgardeo baseUrl
        signInRedirectURL: window.location.origin,
        signOutRedirectURL: window.location.origin,
        scope: ["openid", "profile"]
      }}
    >
      <Router>
        <div className='App'>
          <div>
            <AsgardeoAppContent />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
  
}

const AsgardeoAppContent = () => {

  const [userDetails , setUserDetails] = useState(null);

    const fetchUserDetails = async (jwtToken) => {
      try {
        const response = await axios.get('https://api.asgardeo.io/t/orgueejs/oauth2/userinfo', {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Replace with your actual access token
          },
        });

        const userDetails = response.data;
        setUserDetails(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
        console.log('Response Data:', error.response.data);
      }
    };

    // Call the fetchUserDetails function when the component is mounted
   

  

  const[showForm , setShowForm] = useState(false);
  const toggleForm = () =>{
    setShowNav(showForm);
    setShowRes(showForm);
    setShowFutureRes(showForm);
    setShowForm(!showForm);
    setShowDash(!showForm);
    
  }


  const [showFutureRes , setShowFutureRes] = useState(false)  
  const toggleFutureRes = () =>{
    setShowNav(showFutureRes);
    setShowForm(showFutureRes);
    setShowRes(showFutureRes);
    setShowDash(!showFutureRes);
    setShowFutureRes(!showFutureRes);
  }

  const[showRes , setShowRes] = useState(false);
  const toggleRes = () =>{
    setShowNav(showRes);
    setShowFutureRes(showRes);
    setShowForm(showRes);
    setShowRes(!showRes);
    setShowDash(!showRes);
    
  }

  const[showNav , setShowNav] = useState(false);
  const toggleNav = () =>{
    if(!showNav){
      setShowDash(showNav);
      setShowForm(showNav);
      setShowRes(showNav);
      setShowFutureRes(showNav);
    }
    setShowNav(!showNav);
    
  }

  const[showDash , setShowDash] = useState(false);
  const toggleDash = () =>{
    if(!showDash){
      setShowNav(showDash);
      setShowForm(showDash);
      setShowRes(showDash);
      setShowFutureRes(showDash);
    }
    setShowDash(!showDash);
    
  }


  const { state, getAccessToken, getIDToken, signOut } = useAuthContext(); 
  const [jwtToken, setJwtToken] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const jwtToken = Cookies.get('jwtToken');
      const idToken = Cookies.get('idToken');

      if (jwtToken && idToken) {
        fetchUserDetails(jwtToken);
        const decodedToken = jwt_decode(jwtToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          Cookies.remove('jwtToken');
          Cookies.remove('idToken');
          setJwtToken(null);
          setIdToken(null);
        }
      }
    };

    if (state.isAuthenticated) {
      getAccessToken().then((accessToken) => {
        getIDToken().then((idToken) => {
          Cookies.set('jwtToken', accessToken, { expires: new Date(idToken.exp * 1000) });
          Cookies.set('idToken', idToken, { expires: new Date(idToken.exp * 1000) });
          setJwtToken(accessToken);
          setIdToken(idToken);
          checkTokenExpiration();
        });
      });
    }
  }, [state.isAuthenticated, getAccessToken, getIDToken]);

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    Cookies.remove('idToken');
  };

  useEffect(() => {
    // This effect runs whenever 'state.isAuthenticated', 'showForm', or 'showNav' changes
  }, [state.isAuthenticated, showDash, showNav , showForm , showRes]);
  
  return (
    <>
      <div>
        <NavBar toggleNav={toggleNav} toggleDash={toggleDash}  />
      </div>
      <div>
        {state.isAuthenticated ? (
          showDash ? (
            showForm ? (
              <Form jwtToken={jwtToken} idToken={idToken} />
            ):
            showRes ?(
              <ReservationList jwtToken={jwtToken} idToken={idToken} userDetails={userDetails}  />
            ) :
            showFutureRes ? (
              <FutureRes jwtToken={jwtToken} idToken={idToken} userDetails={userDetails} />
            ):
            (
              <Dashboard toggleDash={toggleDash} toggleForm={toggleForm} toggleRes = {toggleRes} toggleFutureRes={toggleFutureRes}  />
            )
          ) : (
            <Nav />
          )
        ) : (
          <Nav />
        )}
      </div>
    </>
  );  
}

export default App;
