import React from 'react';
import AppState from './AppState';
import Navbar from './components/Navbar'
import Main from './components/Main'


export default () => {
  return (
    // All the components wrapped by AppState are able to get 
    // user and modal state with useContext
    <AppState>
      <Navbar />
      <Main />
    </AppState>
  );
}
