import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    FormControl,
    Button,
    ControlLabel,
    Panel,
    Table
} from 'react-bootstrap';

interface ProjectProps {
    projectId: string;
}
interface Project {
    projectId: number;
    projectName: string;
    minSize: string;
    technologies: string;
    background: string;
    description: string;
}
interface ProjectState {
    students: Array<StudentInfo>;
    project: Project;
    isLoading: Boolean;
}

interface StudentInfo {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
}

class ProjectInformation extends React.Component<ProjectProps, ProjectState> {
constructor(props: ProjectProps) {
    super(props);
    this.state = {
        students: [],
        project: {
        projectId: 0,
        projectName: '',
        minSize: '',
        technologies: '',
        background: '',
        description: ''},
        isLoading: true
    };
    this.handleChange = this.handleChange.bind(this);
}

    componentDidMount() {
        fetch('http://localhost:8080/projects/' + sessionStorage.getItem('email') + '/' + this.props.projectId)
            .then(response => response.json())
            .then(data => this.setState({project: data, isLoading: false}));
    }

    handleChange(e: any) {
    this.setState({ [e.target.id]: e.target.value });

    }

    render() {
        fetch('http://localhost:8080/projects/' + this.state.project.projectId + '/students')
            .then(response => response.json())
            .then(data => this.setState({students: data}));

        return (
        <Panel>
        <Panel.Heading>Project Information</Panel.Heading>
        <Panel.Body>
        <Form horizontal={true} >
            <FormGroup controlId="formHorizontalProjectName">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Project Name</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="projectName"
                    value={this.state.project.projectName}
                    onChange={e => this.handleChange(e)}
                    placeholder="Project Name"
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalNumberStudents">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Number of Students</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="projectSize"
                    placeholder="Number of Students"
                    onChange={e => this.handleChange(e)}
                    value={this.state.project.minSize}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalTechnologies">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Technologies Expected</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="technologiesExpected"
                    value={this.state.project.technologies}
                    placeholder="Technologies expected"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalBackground">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Background Requested</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="backgroundRequested"
                    value={this.state.project.background}
                    placeholder="Background requested"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalDescription">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    componentClass="textarea"
                    type="text"
                    id="projectDescription"
                    value={this.state.project.description}
                    placeholder="Description"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                <Button type="submit">Edit/Save</Button>
                </Col>
            </FormGroup>
        </Form>
        </Panel.Body>
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
        </Panel>
        
        );

    }
}

export default ProjectInformation;