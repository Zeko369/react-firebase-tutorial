import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { SignUpLink } from '../SignUp';
import { ROUTES } from '../../constants';
import { PasswordForgetLink } from '../PasswordForget';

const SignInPage = () => {
  return (
    <>
      <h1>Sign in</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </>
  );
};

const INIT_STATE = {
  email: 'zekan.fran369@gmail.com',
  password: 'foobar',
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INIT_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { email, password, error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={this.onChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={this.onChange}
        />
        <button type="submit">Sign in</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withFirebase,
  withRouter
)(SignInFormBase);

export default SignInPage;
