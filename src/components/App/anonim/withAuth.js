import React from 'react';

import AuthUserContext from '../../Session/context';
import { withFirebase } from '../../Firebase';

const withAuth = (Component) => {
  class WithAuth extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        uid: -1,
        isAnonymous: null
      };

      this.changeUser = this.changeUser.bind(this);
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
        console.log('begin');
        if (authUser) {
          const { uid, isAnonymous } = authUser;
          this.setState({ uid, isAnonymous });
        } else {
          this.setState({ uid: null, isAnonymous: null });
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    changeUser(auth) {
      this.setState({ uid: auth.user.uid, isAnonymous: false });
    }

    render() {
      const { uid, isAnonymous } = this.state;

      return (
        <AuthUserContext.Provider
          value={{ userData: { uid, isAnonymous }, changeUser: this.changeUser }}
        >
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuth);
};

export default withAuth;
