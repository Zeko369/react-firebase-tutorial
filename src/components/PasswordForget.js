import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from './Firebase';
import { ROUTES } from '../constants';

const PasswordForgetPage = () => {
  return (
    <>
      <h1>Password foget</h1>
      <PasswordForgetForm />
    </>
  );
};

const INIT_STATE = {
  email: '',
  error: null
};

class PasswordForgetBase extends Component {
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

    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INIT_STATE });
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.onChange}
          placeholder="email"
        />
        <button type="submit" disabled={isInvalid}>
          Reset my password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => {
  return (
    <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot password?</Link>
    </p>
  );
};

const PasswordForgetForm = withFirebase(PasswordForgetBase);

export default withFirebase(PasswordForgetPage);
export { PasswordForgetLink, PasswordForgetForm };
