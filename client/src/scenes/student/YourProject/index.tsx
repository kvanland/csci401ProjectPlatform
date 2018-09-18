import * as React from 'react';
import {
    Button,
    Table
} from 'reactstrap';
import { getApiURI } from '../../../common/server';
import { Card } from 'reactstrap';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardBody from 'reactstrap/lib/CardBody';

interface IProjectProps {
}

interface IProjectState {
    // groupMembers: Array<{}>;
    stakeholder: IStakeholderInfo;
    students: Array<IStudentInfo>;
    project: IProject;
    isLoading: boolean;
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

class StudentProject extends React.Component<IProjectProps, IProjectState> {
    constructor(props: IProjectProps) {
        super(props);
        this.state = {
            stakeholder: { userId: 0, firstName: '', lastName: '', email: '', organization: '' },
            students: [],
            project: { projectId: 0, projectName: '', members: [] },
            isLoading: true,
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        try {
            const response = await fetch(getApiURI('/projects/student/') + sessionStorage.getItem('email'));
            const data = await response.json();

            this.setState({
                project: data,
                isLoading: false
            });
        } catch (e) {
            console.error(e);
        }

        try {
            const response = await fetch(getApiURI('/projects/') + this.state.project.projectId + '/students');
            const data = await response.json();

            this.setState({
                students: data
            });
        } catch (e) {
            console.error(e);
        }

        try {
            const response = await fetch(getApiURI('/projects/') + this.state.project.projectId + '/stakeholder');
            const data = await response.json();

            this.setState({
                stakeholder: data
            });
        } catch (e) {
            console.error(e);
        }

        /*
                var request = new XMLHttpRequest();
                request.withCredentials = true;
                request.open('POST', 'http://localhost:8080/getProjectByUser/');
                request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                var data = 'getproject';
                request.setRequestHeader('Cache-Control', 'no-cache');
                request.send(data);
        
                var that = this;
                request.onreadystatechange = function() {
                    if (request.readyState === 4) {
                        var response = request.responseText;
                        if (response != null) {
                            var jsonResponse = JSON.parse(response);
                            var stakeholderNameLiteral = 'stakeholderName';
                            that.setState({
                                stakeholder: jsonResponse[stakeholderNameLiteral], 
                                isLoading: false
                            });
                        }
                    }
                }; */
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle componentClass="h3">Overview</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <h3>Project: {this.state.project.projectName}</h3>
                        <Card>
                            <CardHeader>
                                Team Contact Information
                    </CardHeader>
                            <CardBody>
                                <div>
                                    <Table bordered={true}>
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
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                Stakeholder Contact Information
                    </CardHeader>
                            <CardBody>
                                <Table bordered={true}>
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
                                </Table>
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        Actions
                </CardHeader>
                    <CardBody>
                        <Button>Submit Deliverable</Button>
                        <Button href="./weeklyreport">Submit Weekly Status Report</Button>
                        <Button href="./peerreview">Submit Peer Review Form</Button>
                        <Button>Submit Stakeholder Review Form</Button>
                    </CardBody>
                </Card>
            </div>
        );

    }
}

export default StudentProject;
