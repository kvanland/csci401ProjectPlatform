import * as React from 'react';
import { getApiURI, getUserEmail } from '../../common/server';
import { Card, HTMLTable, Button, ButtonGroup, Dialog } from '@blueprintjs/core';
import { withRouter, RouteComponentProps } from 'react-router';
import { IUser } from 'common/interfaces';
import EditProfileForm from './EditProfileForm';
import autobind from 'autobind-decorator';
import { fetchServer } from 'common/server';

interface IStudentHomeProps extends RouteComponentProps {
}

interface IStudentHomeState {
  userProfile?: IUser;
  // groupMembers: Array<{}>;
  stakeholder: IStakeholderInfo;
  students: Array<IStudentInfo>;
  project: IProject;
  isLoading: boolean;
  editProfileFormOpen: boolean;
}
interface IStudentInfo {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface IStakeholderInfo {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
}

interface IProject {
  projectId: number;
  projectName: string;
  members: Array<IStudentInfo>;
}
var x = 'd';

class StudentHome extends React.Component<IStudentHomeProps, IStudentHomeState> {

  state: IStudentHomeState = {
    userProfile: undefined,
    stakeholder: { userId: 0, firstName: '', lastName: '', email: '', organization: '' },
    students: [],
    project: { projectId: 0, projectName: '', members: [] },
    isLoading: false,
    editProfileFormOpen: false,
  };

  async fetchUserProfile() {
    const response = await fetchServer(`/users/${getUserEmail()}`);
    const data = await response.json();

    await this.setState({
      userProfile: data,
    });
  }

  async fetchUserProject() {
    const response = await fetchServer(`/projects/student/${getUserEmail()}`);
    const data = await response.json();

    await this.setState({
      project: data,
    });
  }

  async fetchProjectStudents(projectId: number) {
    const response = await fetchServer(`/projects/${projectId}/students`);
    const data = await response.json();

    await this.setState({
      students: data,
    });
  }

  async fetchProjectStakeholder(projectId: number) {
    const response = await fetchServer(`/projects/${projectId}/stakeholder`);
    const data = await response.json();

    await this.setState({
      stakeholder: data,
    });
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    await this.fetchUserProfile();
    await this.fetchUserProject();
    await this.fetchProjectStudents(this.state.project.projectId);
    await this.fetchProjectStakeholder(this.state.project.projectId);

    this.setState({ isLoading: false });
  }

  @autobind
  toggleEditProfileForm() {
    this.setState({
      editProfileFormOpen: !this.state.editProfileFormOpen,
    });
  }

  render() {
    return (
      <div className="csci-container">

        <div className="csci-side">
          <Card>
            {this.state.userProfile !== undefined ? (
              <div>
                <Button icon="edit" minimal={true} style={{ float: 'right' }} onClick={this.toggleEditProfileForm} />
                <h2 style={{ marginTop: 0 }}>{this.state.userProfile.firstName} {this.state.userProfile.lastName}</h2>
                <p>{this.state.userProfile.email}</p>
                <p>{this.state.userProfile.phone}</p>
              </div>
            ) : 'Loading...'}
          </Card>

          <Card>
            <h2 style={{ marginTop: 0 }}>Actions</h2>
            <ButtonGroup vertical={true} fill={true} alignText="left" large={true}>
              <Button text="Submit Deliverable" disabled={true} />
              <Button text="Submit Weekly Status Report" onClick={() => this.props.history.push('/student/weeklyreport')} />
              <Button text="Submit Peer Review Form" onClick={() => this.props.history.push('/student/peerreview')} />
              <Button text="Submit Stakeholder Review Form" disabled={true} />
            </ButtonGroup>
          </Card>
        </div>

        <div className="csci-main">
          <Card>
            <h2 style={{ marginTop: 0 }}>Team Contact Information</h2>
            <HTMLTable bordered={true} striped={true}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>

                </tr>
              </thead>
              <tbody>
                {this.state.students.map((student: IStudentInfo) =>
                  <tr key={student.userId}>
                    <td> {student.firstName} </td>
                    <td> {student.lastName} </td>
                    <td> {student.email} </td>
                  </tr>
                )}
              </tbody>
            </HTMLTable>
          </Card>

          <Card>
            <h2 style={{ marginTop: 0 }}>Stakeholder Contact Information</h2>
            <HTMLTable bordered={true} striped={true}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Organization</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.stakeholder.firstName}</td>
                  <td>{this.state.stakeholder.lastName}</td>
                  <td>{this.state.stakeholder.email}</td>
                  <td>{this.state.stakeholder.organization}</td>
                </tr>
              </tbody>
            </HTMLTable>
          </Card>
        </div>

        <Dialog
          isOpen={this.state.editProfileFormOpen}
          onClose={this.toggleEditProfileForm}
          title="Edit Profile"
          icon="edit"
        >
          <div style={{ padding: 20 }}>
            <EditProfileForm />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(StudentHome);
