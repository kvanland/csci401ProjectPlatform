import * as React from 'react';
import { IUser } from '../../../common/interfaces';
import { getApiURI } from '../../../common/server';

interface IUserListProps {
}

interface IUserListState {
  users: Array<{}>;
  isLoading: boolean;
}

class UserList extends React.Component<IUserListProps, IUserListState> {
  constructor(props: IUserListProps) {
    super(props);

    this.state = {
      users: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const response = await fetch(getApiURI('/users'));
      const data = await response.json();

      this.setState({
        users: data,
        isLoading: false,
      });
    } catch (e) {
      console.error(e);
    }

  }

  /*
      submitClicked() {
      }

  */

  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>User List</h2>
        {users.map((user: IUser) =>
          <div key={user.id}>
            {user.firstName}
          </div>
        )}
      </div>
    );
  }
}
export default UserList;
