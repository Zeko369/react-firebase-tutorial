import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import { ROUTES } from '../../constants';

const withAutorization = (condition) => (Component) => {
  class WithAutorization extends React.Component {
    componentDidMount() {
      this.listen = this.props.firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          this.props.history.push(ROUTES.SIGN_IN);
        }
      });
    }

    componentWillUnmount() {
      this.listen();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) => (condition(authUser) ? <Component {...this.props} /> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withFirebase,
    withRouter
  )(WithAutorization);
};

export default withAutorization;
