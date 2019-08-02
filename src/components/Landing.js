import React from 'react';
import { withFirebase } from './Firebase';

const LandingPage = (props) => {
  console.log(props.firebase);

  props.firebase.auth.signInAnonymously().catch(function(error) {
    // Handle Errors here.
    console.log(error);
  });

  return <h1>LandingPage</h1>;
};

export default withFirebase(LandingPage);
