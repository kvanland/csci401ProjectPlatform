import * as React from 'react';
import {
    Panel,
    Button,
    Table
} from 'react-bootstrap';

interface ProjectProps {
}

interface ProjectState {
   // groupMembers: Array<{}>;
    stakeholder: StakeholderInfo;
    students: Array<StudentInfo>;
    project: Project;
    isLoading: boolean;
  }
  
interface User {
    name: string;
    email: string;
    phone: string;
}
interface StudentInfo {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface StakeholderInfo {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
}

interface Project {
    projectId: number;
    projectName: string;
    members: Array<StudentInfo>;
}
var x = 'd';

class StudentProject extends React.Component<ProjectProps, ProjectState> {
    constructor(props: ProjectProps) {
        super(props);
        this.state = {
            stakeholder: {userId: 0, firstName: '', lastName: '', email: '', organization: ''},
            students: [],
            project: {projectId: 0, projectName: '', members: []},
            isLoading: true,
        };
    }

    async componentDidMount() {
        this.setState({isLoading: true});

        await fetch('http://localhost:8080/projects/student/' + sessionStorage.getItem('email'))
            .then(response => response.json())
            .then(data => this.setState({project: data, isLoading: false}));

        await fetch('http://localhost:8080/projects/' + this.state.project.projectId + '/students')
            .then(response => response.json())
            .then(data => this.setState({students: data}));

        fetch('http://localhost:8080/projects/' + this.state.project.projectId + '/stakeholder')
            .then(response => response.json())
            .then(data => this.setState({stakeholder: data}));

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
            <Panel>
            <Panel.Heading>
                <Panel.Title componentClass="h3">Overview</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <h3>Project: {this.state.project.projectName}</h3>
                <Panel>
                    <Panel.Heading>
                        Team Contact Information
                    </Panel.Heading>
                    <Panel.Body>
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
                        {this.state.students.map((student: StudentInfo) =>
                            <tr key={student.userId}>
                            <td> {student.firstName} </td>
                            <td> {student.lastName} </td>
                            <td> {student.email} </td>
                            </tr>
                        )}
                        </tbody>
                        </Table>
                        </div>
                    </Panel.Body>
                </Panel>
                <Panel>
                    <Panel.Heading>
                        Stakeholder Contact Information
                    </Panel.Heading>
                    <Panel.Body>
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
                    </Panel.Body>
                </Panel>
            </Panel.Body>
            </Panel>

            <Panel>
                <Panel.Heading>
                    Actions
                </Panel.Heading>
                <Panel.Body>
                    <Button>Submit Deliverable</Button>
                    <Button href="./weeklyreport">Submit Weekly Status Report</Button>
                    <Button href="./peerreview">Submit Peer Review Form</Button>
                    <Button>Submit Stakeholder Review Form</Button>
                </Panel.Body>
            </Panel>
        </div>
        );
            
        }
}

export default StudentProject;
