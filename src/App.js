import React, { useState, useEffect } from 'react';
import { Form, Nav } from './components';
import './App.css';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const App = () => {
  return (
    <Auth0Provider
      domain="dev-m8vl5qthokuutecv.us.auth0.com"
      clientId="Vh7JFCAyC1Omz6oDdyrpmcItVen9F8g9"
      redirectUri={window.location.origin}
    >
      <div className='App'>
        <div>
          <Auth0AppContent />
        </div>
      </div>
    </Auth0Provider>
  );
}

const Auth0AppContent = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessToken();
    }
  }, [isAuthenticated]);

  const getAccessToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      setJwt(accessToken); // Store the JWT token in state
    } catch (error) {
      if (error.error === 'login_required') {
        // The user needs to log in again
        loginWithRedirect();
      } else {
        console.error('Error obtaining access token:', error);
      }
    }
  };

  if (isLoading) {
    // You can optionally show a loading indicator while Auth0 is checking authentication.
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? <Form jwtToken={jwt} /> : <Nav />}
    </div>
  );
  
}

export default App;
