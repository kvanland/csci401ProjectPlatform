import * as React from 'react';
import StudentRegistrationForm from './StudentRegistrationForm';
import { getApiURI } from '../../../common/server';
import autobind from 'autobind-decorator';
import { ButtonGroup, Button, Intent, FormGroup, InputGroup, HTMLTable, Card, Dialog } from '@blueprintjs/core';
import { InputType } from 'reactstrap/lib/Input';
import { Loading } from '../../../components/Loading';

interface IUserListProps {
}

interface IUserListState {
    allUsers: Array<{}>;
    userFilterType: string;
    usersToDisplay: Array<{}>;
    userIndexToEdit: number;
    userToEdit?: IUser;
    userToDelete?: IUser;
    editFirstName: string;
    editLastName: string;
    editUserType: string;
    editSemester: string;
    editEmail: string;
    originalEmail: string;

    isLoading: boolean;
    inviteUsersIsOpen: boolean;
}

interface IUser {
    userId: number;
    firstName: string;
    lastName: string;
    userType: string;
    email: string;
    semester: string;
}

class UserManagement extends React.Component<IUserListProps, IUserListState> {
    state: IUserListState = {
        allUsers: [],
        userFilterType: 'All',
        usersToDisplay: [],
        userIndexToEdit: -1,
        userToEdit: undefined,
        userToDelete: undefined,

        editFirstName: '',
        editLastName: '',
        editUserType: '',
        editSemester: '',
        editEmail: '',

        originalEmail: '',
        isLoading: false,
        inviteUsersIsOpen: false,
    };

    async componentDidMount() {
        this.setState({ isLoading: true });

        try {
            const response = await fetch(getApiURI('/users'), {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                })
            });
            const data = await response.json();

            this.setState({
                allUsers: data,
                usersToDisplay: data,
                isLoading: false,
            });
        } catch (e) {
            console.error(e);
        }

    }

    cancelEdit = () => {
        this.setState({ userIndexToEdit: -1 });
    }

    @autobind
    async submitEdit() {
        try {
            await fetch(getApiURI('/users/update-info'), {
                method: 'POST',
                credentials: 'include',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Cache-Control': 'no-cache',
                }),
                body: JSON.stringify({
                    firstName: this.state.editFirstName,
                    lastName: this.state.editLastName,
                    userType: this.state.editUserType,
                    semester: this.state.editSemester,
                    email: this.state.editEmail,
                    originalEmail: this.state.originalEmail
                }),
            });
            alert('User has been updated succesfully!');
        } catch (e) {
            console.error(e);
        }
    }

    @autobind
    toggleInviteUsers() {
        this.setState({
            inviteUsersIsOpen: !this.state.inviteUsersIsOpen,
        });
    }

    handleChange = (id: keyof IUserListState) => (e: React.FormEvent<any>) => {
        this.setState({
            [id]: e.currentTarget.value,
        } as any);
    }

    handleUserFilterChange = (userFilterType: string) => () => {
        var _usersToDisplay: IUser[] = [];
        const { allUsers } = this.state;

        allUsers.forEach((user: IUser) => {
            if (user.userType === userFilterType) {
                _usersToDisplay.push(user);
            } else if (userFilterType === 'All') {
                _usersToDisplay.push(user);
            }
        });

        this.setState({ userFilterType, usersToDisplay: _usersToDisplay });
    }

    editUser(index: number, user: IUser) {
        this.setState({
            userIndexToEdit: index,
            userToEdit: user,
            editFirstName: user.firstName,
            editLastName: user.lastName,
            editUserType: user.userType,
            editEmail: user.email,
            originalEmail: user.email,
            editSemester: user.semester,
        });
    }

    deleteUser(user: IUser) {
        const name = user.firstName;
        var submit = confirm('Are you sure you want to delete ' + name + '?');
        if (submit) {
            this.setState({ userToDelete: user });
        }
    }

    setOriginalEmail(email: string) {
        this.setState({
            originalEmail: email
        });
    }

    @autobind
    renderFormGroup(id: keyof IUserListState, type: InputType, label: string, placeholder: string) {
        return (
            <FormGroup label={label} labelFor={id}>
                <InputGroup
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    value={this.state[id] as any}
                    onChange={this.handleChange(id)}
                />
            </FormGroup>
        );
    }

    render() {
        const { allUsers, usersToDisplay, isLoading, userIndexToEdit, userToEdit } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return (
            <div className="csci-container">
                <div className="csci-main">
                    <Card>
                        <Button text="Invite Users" icon="plus" intent={Intent.PRIMARY} style={{ float: 'right' }} onClick={this.toggleInviteUsers} />
                        <ButtonGroup minimal={true}>
                            <Button onClick={this.handleUserFilterChange('All')} icon="filter" active={this.state.userFilterType === 'All'}>All</Button>
                            <Button onClick={this.handleUserFilterChange('Student')} active={this.state.userFilterType === 'Student'}>Student</Button>
                            <Button onClick={this.handleUserFilterChange('Stakeholder')} active={this.state.userFilterType === 'Stakeholder'}>Stakeholder</Button>
                            <Button onClick={this.handleUserFilterChange('Admin')} active={this.state.userFilterType === 'Admin'}>Admin</Button>
                        </ButtonGroup>

                        <HTMLTable bordered={true} striped={true} style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>User Type</th>
                                    <th>Email</th>
                                    <th>Semester</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersToDisplay.map((user: IUser, index: number) =>
                                    <tr key={user.userId}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.userType}</td>
                                        <td>{user.email}</td>
                                        <td>{user.semester}</td>
                                        <td>
                                            <Button intent={Intent.WARNING} onClick={() => this.editUser(index, user)} text="Edit" />
                                            <Button intent={Intent.DANGER} onClick={() => this.deleteUser(user)} text="Delete" />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </HTMLTable>
                    </Card>
                </div>

                <Dialog
                    isOpen={typeof userToEdit !== 'undefined' && userIndexToEdit !== -1}
                    onClose={this.cancelEdit}
                    title="Edit User"
                    icon="edit"
                >
                    <div style={{ padding: 20 }}>
                        {this.renderFormGroup('editFirstName', 'text', 'First Name', 'Tommy')}
                        {this.renderFormGroup('editLastName', 'text', 'Last Name', 'Trojan')}
                        {this.renderFormGroup('editEmail', 'email', 'Email', 'ttrojan@usc.edu')}
                        <FormGroup label="User Type" labelFor="editUserType">
                            <select
                                id="editUserType"
                                value={this.state.editUserType}
                                onChange={this.handleChange('editUserType')}
                            >
                                <option value="Student">Student</option>
                                <option value="Admin">Admin</option>
                                <option value="Stakeholder">Stakeholder</option>
                            </select>
                        </FormGroup>
                        {this.renderFormGroup('editSemester', 'text', 'Semester', 'SP19')}

                        <div>
                            <Button onClick={this.cancelEdit}>Cancel</Button>
                            <Button onClick={this.submitEdit} intent={Intent.SUCCESS}>Save</Button>
                        </div>
                    </div>
                </Dialog>

                <Dialog
                    isOpen={this.state.inviteUsersIsOpen}
                    onClose={this.toggleInviteUsers}
                    title="Invite Users"
                    icon="plus"
                >
                    <div style={{ padding: 20 }}>
                        <StudentRegistrationForm />
                    </div>
                </Dialog>
            </div>);
    }
}
export default UserManagement;
