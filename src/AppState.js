import React, { useState } from 'react';
import AppContext from './context/app';

export default ({ children }) => {
  // preinitializing student state instead of using 
  // use effect and api call
  const [ student, setStudent ] = useState({
    username: 'bobloblaw',
    email: 'bob@loblaw.com',
    hsk: 4,
  });

  const [ modal, setModal ] = useState({ type: null });

  return (
    // Insert the above states into context so all of the children
    // components can use them via useContext 
    <AppContext.Provider 
      value={{
        student, setStudent,
        modal, setModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}