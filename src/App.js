import React, { useState, useEffect } from 'react';
import { Form, Nav , NavBar } from './components'; // Import your Form and Nav components
import './App.css';
import { AuthProvider, useAuthContext } from '@asgardeo/auth-react'; // Import Asgardeo authentication components
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


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

  const[showForm , setShowForm] = useState(false);
  const toggleForm = () =>{
    setShowForm(!showForm);
  }


  const { state, getAccessToken, getIDToken, signOut } = useAuthContext(); 
  const [jwtToken, setJwtToken] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const jwtToken = Cookies.get('jwtToken');
      const idToken = Cookies.get('idToken');

      if (jwtToken && idToken) {
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

  return (
    // <Routes>
    //   <Route
    //     path="/form"
    //     element={state.isAuthenticated ? <Form jwtToken={jwtToken} idToken={idToken} /> : <Navigate to="/" />}
    //   />
    //   <Route
    //     path="/"
    //     element={state.isAuthenticated ? <Nav />: <Nav onLogout={handleLogout} />}
    //   />
    // </Routes>
    <>
    <div>
      <NavBar />
    </div>
    <div>
      {state.isAuthenticated && toggleForm ? (<Form jwtToken={jwtToken} idToken={idToken}   />) : (<Nav toggleForm={toggleForm}/>)}
    </div>
    </>
  );
}

export default App;
