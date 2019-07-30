import React from 'react';

import './App.css';

import Main from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Main />
    </FirebaseContext.Provider>
  );
};

export default App;
