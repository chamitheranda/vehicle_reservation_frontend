import React, { useState, useEffect, useCallback } from 'react';
import { Form, Nav, NavBar, Dashboard, ReservationList, FutureRes, Footer, Profile } from './components';
import './App.css';
import { AuthProvider, useAuthContext } from '@asgardeo/auth-react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  return (
    <AuthProvider
      config={{
        clientID: //replace with your clientID,
        baseUrl:  //replace with your baseURL,
        signInRedirectURL: window.location.origin,
        signOutRedirectURL: window.location.origin,
        scope: ['openid', 'profile'],
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
};

const AsgardeoAppContent = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const { state, getAccessToken, getIDToken, signOut, signIn } = useAuthContext();
  const [jwtToken, setJwtToken] = useState(null);
  const [idToken, setIdToken] = useState(null);

  const [showProfile, setShowProfile] = useState(false);
  const togglePro = () => {
    if (!showProfile) {
      setShowNav(showProfile);
      setShowRes(showProfile);
      setShowFutureRes(showProfile);
      setShowForm(showProfile);
      setShowDash(showProfile);
    }
    setShowProfile(!showProfile);
  };

  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowNav(showForm);
    setShowRes(showForm);
    setShowFutureRes(showForm);
    setShowProfile(showForm);
    setShowForm(!showForm);
    setShowDash(!showForm);
  };

  const [showFutureRes, setShowFutureRes] = useState(false);
  const toggleFutureRes = () => {
    setShowNav(showFutureRes);
    setShowForm(showFutureRes);
    setShowRes(showFutureRes);
    setShowProfile(showFutureRes);
    setShowDash(!showFutureRes);
    setShowFutureRes(!showFutureRes);
  };

  const [showRes, setShowRes] = useState(false);
  const toggleRes = () => {
    setShowNav(showRes);
    setShowFutureRes(showRes);
    setShowForm(showRes);
    setShowProfile(showRes);
    setShowRes(!showRes);
    setShowDash(!showRes);
  };

  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    if (!showNav) {
      setShowDash(showNav);
      setShowForm(showNav);
      setShowRes(showNav);
      setShowFutureRes(showNav);
      setShowProfile(showNav);
    }
    setShowNav(!showNav);
  };

  const [showDash, setShowDash] = useState(false);
  const toggleDash = () => {
    if (!showDash) {
      setShowNav(showDash);
      setShowForm(showDash);
      setShowRes(showDash);
      setShowFutureRes(showDash);
      setShowProfile(showDash);
    }
    setShowDash(!showDash);
  };

  const checkTokenExpiration = useCallback(() => {
    const jwtToken = Cookies.get('jwtToken');
    const idToken = Cookies.get('idToken');

    if (jwtToken && idToken) {
      const decodedToken = jwt_decode(jwtToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        Cookies.remove('jwtToken');
        Cookies.remove('idToken');
        Cookies.remove('csrfToken')
        setJwtToken(null);
        setIdToken(null);
        setCsrfToken(null);
      }
    }
  }, []);


  useEffect(() => {
    console.log("mount 2 useEffect");
    const fetchData = async () => {
      console.log("inside fetchData()");
      try {
        if (csrfToken === null && state.isAuthenticated) { // This condition is commented out as it seems unnecessary
          console.log("inside the csrf logic");
          const response = await fetch('http://localhost:8080/api/v1/csrf/get-csrf', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              'Content-Type': 'application/json',
              'XCSRFTOKEN': "CsrfToken"
            },
          });
          
          console.log("get csrf token");

          if (response.ok) {
            const token3 = await response.json();
            const data = token3.token;
            setCsrfToken(data);
            setJwtToken(jwtToken);
            setIdToken(idToken);
            console.log("csrf token === "+data);
            console.log(response);
          } else {
            console.error('Failed to fetch CSRF token:', response.status);
          }
        } else {
          console.error("CSRF token already taken");
        }
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    if(csrfToken === null){
      fetchData()
    }
  
  }, [csrfToken  ]); // Include the necessary dependencies

  useEffect(() => {
    console.log("mount 1 useEffect");
    const fetchUserDetails = async () => {

      if (userDetails === null && jwtToken !== null ) {
        console.log("inside the condition");
        try {
          const response = await axios.get('https://api.asgardeo.io/t/orgueejs/oauth2/userinfo', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
  
          const userDetails = response.data;
          setUserDetails(userDetails);
          console.log("get user information ");

        } catch (error) {
          console.error('Error fetching user details:', error);
          console.log('Response Data:', error.response.data);
        }
      } 
    };
  
    if (state.isAuthenticated) {
      fetchUserDetails();
    }
  }, [jwtToken ]);
  
  useEffect(() => {
    console.log("mount 3 useEffect");
    if (state.isAuthenticated && jwtToken === null) {
      getAccessToken().then((jwtToken) => {
        getIDToken().then((idToken) => {
          Cookies.set('jwtTokenCookie', jwtToken, {
            expires: new Date(idToken.exp * 1000),
            // httpOnly: true,
            secure: true,
          });
          Cookies.set('idTokenCookie', idToken, {
            expires: new Date(idToken.exp * 1000),
            // httpOnly: true,
            secure: true,
          });
          Cookies.set('csrfTokenCookie', csrfToken, {
            expires: new Date(idToken.exp * 1000),
            // httpOnly: true,
            secure: true,
          });
         



          setJwtToken(jwtToken);
          setIdToken(idToken);
          // setCsrfToken(data);
          checkTokenExpiration();
          console.log("jwt token = "+ Cookies.get("jwtTokenCookie"));
          console.log("id token ="+Cookies.get("idTokenCookie"));
          console.log("csrf token = "+Cookies.get("csrfTokenCookie"));
          console.log("csrf token = " + csrfToken)
        });
      });
      // if (state.isAuthenticated && jwtToken) {
      //     fetchUserDetails(jwtToken);
      // }
      // fetchData();
      
      
    }
  }, [state.isAuthenticated, getAccessToken, csrfToken]);



  

  const handleSignOutClick = () => {
    if (state.isAuthenticated) {
      if (window.confirm('Are you sure you want to log out?')) {
        Cookies.remove('jwtToken');
        Cookies.remove('idToken');
        Cookies.remove('csrfTokenCookie');
        setCsrfToken(null);
        setJwtToken(null);
        setIdToken(null);
        if (typeof signOut === 'function') {
          signOut();
        }
      }
    } else {
      alert('Please SignIn or Register');
    }
  };

  const handleSignInClick = () => {
    if (state.isAuthenticated) {
      alert('You are already logged in !!!');
    } else {
      signIn();
    }
  };


  return (
    <>
      <div>
        <NavBar toggleNav={toggleNav} toggleDash={toggleDash} togglePro={togglePro} />
      </div>
      <div>
        {state.isAuthenticated ? (
          showDash ? (
            showForm ? (
              <Form jwtToken={jwtToken} idToken={idToken} userDetails={userDetails} csrfToken = {csrfToken} />
            ) : showRes ? (
              <ReservationList jwtToken={jwtToken} idToken={idToken} userDetails={userDetails} csrfToken = {csrfToken} />
            ) : showFutureRes ? (
              <FutureRes jwtToken={jwtToken} idToken={idToken} userDetails={userDetails} csrfToken={csrfToken}/>
            ) : (
              <Dashboard
                toggleDash={toggleDash}
                toggleForm={toggleForm}
                userDetails={userDetails}
                toggleRes={toggleRes}
                toggleFutureRes={toggleFutureRes}
              />
            )
          ) : showProfile ? (
            <Profile userDetails={userDetails} />
          ) : (
            <Nav handleSignOutClick={handleSignOutClick} handleSignInClick={handleSignInClick} />
          )
        ) : (
          <Nav handleSignOutClick={handleSignOutClick} handleSignInClick={handleSignInClick} />
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default App;