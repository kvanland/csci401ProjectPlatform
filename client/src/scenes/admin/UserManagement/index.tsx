import * as React from 'react';
import StudentRegistrationForm from './StudentRegistrationForm';
import { fetchServer } from '../../../common/server';
import autobind from 'autobind-decorator';
import { ButtonGroup, Button, Intent, FormGroup, InputGroup, HTMLTable, Card, Dialog, Tabs, Tab, TabId, Icon, HTMLSelect, Toaster, Position, Classes } from '@blueprintjs/core';
import { InputType } from 'reactstrap/lib/Input';
import { Loading } from '../../../components/Loading';
import { MainToast } from 'components/MainToast';

interface IUserListProps {
}

interface IUserListState {
    allUsers: IUser[];
    userFilterType: string;
    userIdToEdit?: number;

    userTypeTab: TabId;

    editFirstName: string;
    editLastName: string;
    editUserType: string;
    editSemester: string;
    editYear: string;
    editEmail: string;
    originalEmail: string;

    listOfYears: string[];

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
    year: string;
}

@autobind
class UserManagement extends React.Component<IUserListProps, IUserListState> {
    constructor(props: IUserListState) {
        super(props);

        const years: string[] = [];
        const currYear = (new Date()).getFullYear();
    
        for (var j = 0; j < 5; j++) {
          years.push((currYear - 2 + j).toString());
        }

        this.state = {
            allUsers: [],
            userFilterType: 'All',
            userIdToEdit: undefined,
    
            userTypeTab: 'students',
    
            editFirstName: '',
            editLastName: '',
            editUserType: '',
            editSemester: '',
            editYear: years[0],
            editEmail: '',

            listOfYears: years,
    
            originalEmail: '',
            isLoading: false,
            inviteUsersIsOpen: false,
        };
    }

    async componentDidMount() {
        this.fetchUsers();
    }

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
        this.setState({ userIdToEdit: undefined });
    }

    async submitEdit() {
        try {
            await fetchServer('/users/update-info', 'POST', {
                firstName: this.state.editFirstName,
                lastName: this.state.editLastName,
                userType: this.state.editUserType,
                semester: this.state.editSemester,
                year: this.state.editYear,
                email: this.state.editEmail,
                originalEmail: this.state.originalEmail
            });

            this.cancelEdit();

            MainToast.show({
                intent: Intent.SUCCESS,
                icon: 'tick',
                message: 'User has been updated successfully!',
            });
        } catch (e) {
            MainToast.show({
                intent: Intent.SUCCESS,
                icon: 'error',
                message: 'An error occurred: could not update user.',
            });
        } finally {
            this.fetchUsers();
        }
    }

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

    editUser = (userId: number) => () => {
        const user = this.getUser(userId);
        if (user === undefined) {
            return;
        }

        this.setState({
            userIdToEdit: userId,
            editFirstName: user.firstName,
            editLastName: user.lastName,
            editUserType: user.userType,
            editEmail: user.email,
            originalEmail: user.email,
            editSemester: user.semester,
            editYear: user.year,
        });
    }

    getUser(userId: number) {
        return this.state.allUsers.find((u: IUser) => u.userId === userId);
    }

    deleteUser = (userId: number) => async () => {
        const user = this.getUser(userId);
        if (user === undefined) {
            return;
        }

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

    renderStudentsCard() {
        const users = this.state.allUsers.filter((user: IUser) => user.userType === 'Student');
        return (
            <Card>
                <HTMLTable bordered={true} striped={true} style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Semester</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: IUser) =>
                            <tr key={user.userId}>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.semester}{user.year}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Button onClick={this.editUser(user.userId)} text="Edit" icon="edit" />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </HTMLTable>
            </Card>
        );
    }

    renderStakeholdersCard() {
        const users = this.state.allUsers.filter((user: IUser) => user.userType === 'Stakeholder');

        return (
            <Card>
                <HTMLTable bordered={true} striped={true} style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: IUser) =>
                            <tr key={user.userId}>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Button onClick={this.editUser(user.userId)} text="Edit" icon="edit" />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </HTMLTable>
            </Card>
        );
    }

    renderAdminsCard() {
        const users = this.state.allUsers.filter((user: IUser) => user.userType === 'Admin');

        return (
            <Card>
                <HTMLTable bordered={true} striped={true} style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: IUser) =>
                            <tr key={user.userId}>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Button onClick={this.editUser(user.userId)} text="Edit" icon="edit" />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </HTMLTable>
            </Card>
        );
    }

    renderEditUserDialog() {
        const { userIdToEdit } = this.state;

        return (
            <Dialog
                isOpen={userIdToEdit !== undefined}
                onClose={this.cancelEdit}
                title="Edit User"
                icon="edit"
            >
                <div className={Classes.DIALOG_BODY}>
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
                        <table>
                            <tr>
                                <td>
                                    <HTMLSelect
                                        id="editSemester"
                                        value={this.state.editSemester}
                                        onChange={this.handleChange('editSemester')}
                                    >
                                        <option value="SUMMER">SUMMER</option>
                                        <option value="FALL">FALL</option>
                                        <option value="SPRING">SPRING</option>
                                    </HTMLSelect>
                                </td>
                                <td>
                                    <HTMLSelect
                                        id="editYear"
                                        value={this.state.editYear}
                                        onChange={this.handleChange('editYear')}
                                        options={this.state.listOfYears}
                                    />
                                </td>
                            </tr>
                        </table>
                    </FormGroup>
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button
                            icon="trash"
                            intent={Intent.DANGER}
                            minimal={true}
                            onClick={this.deleteUser(userIdToEdit!)}
                        />
                        <Button onClick={this.cancelEdit}>Cancel</Button>
                        <Button onClick={this.submitEdit} intent={Intent.SUCCESS}>Save Changes</Button>
                    </div>
                </div>
            </Dialog>
        );
    }

    renderInviteUsers() {
        return (
            <Dialog
                isOpen={this.state.inviteUsersIsOpen}
                onClose={this.toggleInviteUsers}
                title="Invite Users"
                icon="plus"
            >
                <StudentRegistrationForm />
            </Dialog>
        );
    }
}
export default UserManagement;
