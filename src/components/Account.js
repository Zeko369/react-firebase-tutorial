import React, { useContext } from 'react';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChageForm from './PasswordChange';
import { withAutorization, AuthUserContext } from './Session';

const AccountPage = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <>
      <h1>Account {authUser.email}</h1>
      <PasswordForgetForm />
      <PasswordChageForm />
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAutorization(condition)(AccountPage);
