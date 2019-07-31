import React, { Component } from 'react';

import { ROLES } from '../constants';
import { withAutorization } from './Session';
import { withFirebase } from './Firebase';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      users: []
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', (snapshot) => {
      const usersobject = snapshot.val();
      const usersArray = Object.keys(usersobject).map((key) => ({
        ...usersobject[key],
        uid: key
      }));

      this.setState({
        users: usersArray,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { loading, users } = this.state;

    return (
      <>
        <h1>Admin</h1>
        {loading && <div>Loading... </div>}
        {!loading && <UserList users={users} />}
      </>
    );
  }
}

const UserList = (props) => {
  const { users } = props;

  return (
    <table>
      <thead>
        <tr>
          <td>UID</td>
          <td>Email</td>
          <td>Username</td>
        </tr>
      </thead>

      <tbody>
        {users.map((item, key) => (
          <tr key={`table-row-${key}`}>
            <td>{item.uid}</td>
            <td>{item.email}</td>
            <td>{item.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

// export default withAutorization(condition)(AdminPage);

export default withFirebase(AdminPage);
