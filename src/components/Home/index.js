import React from 'react';

import { withAutorization } from '../Session';

const HomePage = () => {
  return (
    <>
      <h1>Home page</h1>
      <p>You can only see this if you're logged in</p>
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAutorization(condition)(HomePage);
