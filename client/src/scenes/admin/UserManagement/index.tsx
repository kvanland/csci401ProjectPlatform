import * as React from 'react';
import StudentRegistrationForm from './StudentRegistrationForm';
import { fetchServer } from '../../../common/server';
import autobind from 'autobind-decorator';
import { ButtonGroup, Button, Intent, FormGroup, InputGroup, HTMLTable, Card, Dialog, Tabs, Tab, TabId, Icon, HTMLSelect, Toaster, Position } from '@blueprintjs/core';
import { InputType } from 'reactstrap/lib/Input';
import { Loading } from '../../../components/Loading';

const FormToast = Toaster.create({
    position: Position.TOP,
});

interface IUserListProps {
}

interface IUserListState {
    allUsers: Array<{}>;
    userFilterType: string;
    userIndexToEdit: number;
    userToEdit?: IUser;
    userToDelete?: IUser;

    userTypeTab: TabId;

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
        userIndexToEdit: -1,
        userToEdit: undefined,
        userToDelete: undefined,

        userTypeTab: 'students',

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
        this.fetchUsers();
    }

    @autobind
    async fetchUsers() {
        this.setState({ isLoading: true });

        const response = await fetchServer('/users', 'GET');
        const data = await response.json();
        this.setState({
            allUsers: data,
            isLoading: false,
        });
    }

    cancelEdit = () => {
        this.setState({ userIndexToEdit: -1 });
    }

    @autobind
    async submitEdit() {
        try {
            await fetchServer('/users/update-info', 'POST', {
                firstName: this.state.editFirstName,
                lastName: this.state.editLastName,
                userType: this.state.editUserType,
                semester: this.state.editSemester,
                email: this.state.editEmail,
                originalEmail: this.state.originalEmail
            });

            this.cancelEdit();

            FormToast.show({
                intent: Intent.SUCCESS,
                message: 'User has been updated successfully!',
            });
        } catch (e) {
            FormToast.show({
                intent: Intent.SUCCESS,
                message: 'An error occurred: could not update user.',
            });
        } finally {
            this.fetchUsers();
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

    async deleteUser(user: IUser) {
        const firstName = user.firstName;
        const lastName = user.lastName;
        var confirmed = confirm('Are you sure you want to delete ' + firstName + ' ' + lastName + '?');
        if (confirmed) {
            await fetchServer(`/users/${user.email}/delete`, 'POST');
            this.fetchUsers();
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

    @autobind
    handleTabChange(newTabId: TabId) {
        this.setState({
            userTypeTab: newTabId,
        });
    }

    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return (
            <div className="csci-container">
                <div className="csci-main">
                    <div style={{ margin: 20 }}>
                        <Tabs id="UserTypeTabs" onChange={this.handleTabChange} selectedTabId={this.state.userTypeTab} large={true}>
                            <Tab id="students" title="Students" />
                            <Tab id="stakeholders" title="Stakeholders" />
                            <Tab id="admins" title="Admins" />
                            <Tabs.Expander />
                            <Button text="Invite Users" icon="plus" intent={Intent.PRIMARY} onClick={this.toggleInviteUsers} />
                        </Tabs>
                    </div>

                    {this.state.userTypeTab === 'students' && this.renderStudentsCard()}

                    {this.state.userTypeTab === 'stakeholders' && this.renderStakeholdersCard()}

                    {this.state.userTypeTab === 'admins' && this.renderAdminsCard()}
                </div>

                {this.renderEditUserDialog()}

                {this.renderInviteUsers()}
            </div>);
    }

    @autobind
    renderStudentsCard() {
        const users = this.state.allUsers.filter((user: IUser) => user.userType === 'Student');
        return (
            <Card>
                <HTMLTable bordered={true} striped={true} style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Semester</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: IUser, index: number) =>
                            <tr key={user.userId}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.semester}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button intent={Intent.WARNING} onClick={() => this.editUser(index, user)} text="Edit" icon="edit" />
                                        <Button intent={Intent.DANGER} onClick={() => this.deleteUser(user)} text="Delete" icon="trash" />
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </HTMLTable>
            </Card>
        );
    }

    @autobind
    renderStakeholdersCard() {
        const users = this.state.allUsers.filter((user: IUser) => user.userType === 'Stakeholder');

        return (
            <Card>
                <HTMLTable bordered={true} striped={true} style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: IUser, index: number) =>
                            <tr key={user.userId}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button intent={Intent.WARNING} onClick={() => this.editUser(index, user)} text="Edit" icon="edit" />
                                        <Button intent={Intent.DANGER} onClick={() => this.deleteUser(user)} text="Delete" icon="trash" />
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </HTMLTable>
            </Card>
        );
    }

    @autobind
    renderAdminsCard() {
        const users = this.state.allUsers.filter((user: IUser) => user.userType === 'Admin');

        return (
            <Card>
                <HTMLTable bordered={true} striped={true} style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: IUser, index: number) =>
                            <tr key={user.userId}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button intent={Intent.WARNING} onClick={() => this.editUser(index, user)} text="Edit" icon="edit" />
                                        <Button intent={Intent.DANGER} onClick={() => this.deleteUser(user)} text="Delete" icon="trash" />
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </HTMLTable>
            </Card>
        );
    }

    @autobind
    renderEditUserDialog() {
        const { userIndexToEdit, userToEdit } = this.state;

        return (
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
                        <HTMLSelect
                            id="editUserType"
                            value={this.state.editUserType}
                            onChange={this.handleChange('editUserType')}
                        >
                            <option value="Student">Student</option>
                            <option value="Admin">Admin</option>
                            <option value="Stakeholder">Stakeholder</option>
                        </HTMLSelect>
                    </FormGroup>
                    <FormGroup label="Semester" labelFor="editSemester">
                        <HTMLSelect
                            id="editSemester"
                            value={this.state.editSemester}
                            onChange={this.handleChange('editSemester')}
                        >
                            <option value="SUMMER18">Summer 2018</option>
                            <option value="FALL18">Fall 2018</option>
                            <option value="SPRING19">Spring 2019</option>
                        </HTMLSelect>
                    </FormGroup>

                    <div>
                        <Button onClick={this.cancelEdit}>Cancel</Button>
                        <Button onClick={this.submitEdit} intent={Intent.SUCCESS}>Save</Button>
                    </div>
                </div>
            </Dialog>
        );
    }

    @autobind
    renderInviteUsers() {
        return (
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
        );
    }
}
export default UserManagement;
