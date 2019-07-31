import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../constants';
import SignOut from './SignOut';
import { AuthUserContext } from './Session';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNoAuth />)}
  </AuthUserContext.Consumer>
);

const loggedIn = ['LANDING', 'HOME', 'ACCOUNT', 'ADMIN'];
const loggedOut = ['LANDING', 'SIGN_IN'];

const NavigationNoAuth = () => <NavigationBase items={loggedOut} />;
const NavigationAuth = () => <NavigationBase items={loggedIn} auth />;

const NavigationBase = (props) => {
  const { items, auth } = props;

  const getRoute = (name) => ROUTES[name];
  const getText = (name) => {
    const string = name.toLowerCase().replace(/_/g, ' ');
    return string.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <nav>
      {items.map((item, index) => (
        <div className="item" key={`link-${index}`}>
          <Link to={getRoute(item)}>{getText(item)}</Link>
        </div>
      ))}
      {auth && (
        <div className="right">
          <SignOut />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
