import React from 'react';
import AppState from './AppState';
import Navbar from './Navbar'
import Main from './Main'
import Modal from './Modal'

export default () => {
  return (
    // All the components wrapped by AppState are able to get 
    // user and modal state with useContext
    <AppState>
      <Navbar/>
      <Main/>
      <Modal />
    </AppState>
  );
}
