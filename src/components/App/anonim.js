import React, { Component, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import withAuth from './anonim/withAuth';
import { AuthUserContext } from '../Session';

const SignInForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthUserContext);

  const onSubmit = (e) => {
    e.preventDefault();

    props.firebase
      .anonUserToNormal(email, password)
      .then((user) => {
        auth.changeUser(user);
        props.history.push('/home');
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign up</button>
    </form>
  );
};

const Form = withRouter(withFirebase(SignInForm));

const LandingPage = (props) => {
  const auth = useContext(AuthUserContext);
  const { isAnonymous, uid } = auth.userData;

  if (uid === null) {
    console.log('Sign in anon');
    props.firebase.auth.signInAnonymously().catch(function(error) {
      console.error(error);
    });
  }

  return (
    <>
      <h1>Landing page</h1>
      {!isAnonymous ? 'Signed in' : <Form />}
    </>
  );
};

const Landing = withAuth(LandingPage);

const Header = (props) => {
  const auth = useContext(AuthUserContext);
  const { isAnonymous, uid } = auth.userData;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <h2>{uid ? (isAnonymous ? 'Anonymous user' : uid) : 'No user'}</h2>
      <h3 style={{ marginLeft: '10px' }}>{uid}</h3>
      {uid && <button onClick={props.firebase.auth.doSignOut}>Sign out</button>}
    </div>
  );
};

const HEADER = withFirebase(Header);

const Home = () => {
  return (
    <>
      <h1>Logged in</h1>
    </>
  );
};

class Anonim extends Component {
  render() {
    return (
      <Router>
        <>
          <HEADER />
          <Route exact path={'/'} component={Landing} />
          <Route exact path={'/home'} component={Home} />
        </>
      </Router>
    );
  }
}

export default withAuth(Anonim);
