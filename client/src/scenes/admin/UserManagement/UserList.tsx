import * as React from 'react';
import { IUser } from '../../../common/interfaces';
import { getApiURI } from '../../../common/server';
import { Loading } from 'components/Loading';
import { fetchServer } from 'common/server';

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

    const response = await fetchServer('/users');
    if (response.ok) {
      const data = await response.json();
      this.setState({
        users: data,
        isLoading: false,
      });
    }
  }

  /*
      submitClicked() {
      }

  */

  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
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
