import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { ROUTES } from '../constants';
import { withFirebase } from './Firebase';

const SignUpPage = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <SignUpForm />
    </>
  );
};

// also you could use static contextType = FirebaseContext and then access
// context via this.context call in class

const INIT_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INIT_STATE };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return this.props.firebase.user(authUser.user.uid).set({ username, email });
      })
      .then(() => {
        this.setState({ ...INIT_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, email, password, passwordConfirm, error } = this.state;
    const isInvalid =
      password !== passwordConfirm || username === '' || email === '' || password === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="name"
          name="username"
          onChange={this.onChange}
          value={username}
          placeholder="username"
        />
        <input
          type="email"
          name="email"
          onChange={this.onChange}
          value={email}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          onChange={this.onChange}
          value={password}
          placeholder="password"
        />
        <input
          type="password"
          name="passwordConfirm"
          onChange={this.onChange}
          value={passwordConfirm}
          placeholder="passwordConfirm"
        />

        <button type="submit" disabled={isInvalid}>
          Sign up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

const SignUpLink = () => {
  return (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
};

export default SignUpPage;
export { SignUpLink, SignUpForm };
