import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { ROUTES } from '../../constants';

const INIT_STATE = {
  password: '',
  passwordConfirm: '',
  error: null
};

class PasswordChangeBase extends Component {
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

    const { password } = this.state;

    this.props.firebase
      .doPasswordUpdate(password)
      .then(() => {
        this.setState({ ...INIT_STATE });
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { password, passwordConfirm, error } = this.state;
    const isInvalid = password !== passwordConfirm || password === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.onChange}
          placeholder="password"
        />
        <input
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={this.onChange}
          placeholder="passwordConfirm"
        />
        <button type="submit" disabled={isInvalid}>
          Reset my password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordChangeForm = withFirebase(PasswordChangeBase);

export default PasswordChangeForm;
