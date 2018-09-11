import * as React from 'react';
import { IProject } from '../../../common/interfaces';
import {
    Form,
    FormGroup,
    Col,
    FormControl,
    Button,
    ControlLabel,
    Panel,
    Table,
    FormControlProps
} from 'react-bootstrap';

interface IProjectProps {
    projectId: string;
}
interface IProjectState extends IProject {
    students: Array<IStudentInfo>;
    isLoading: Boolean;
}

interface IStudentInfo {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
}

class ProjectInformation extends React.Component<IProjectProps, IProjectState> {
    constructor(props: IProjectProps) {
        super(props);
        this.state = {
            students: [],
            projectId: 0,
            projectName: '',
            minSize: '',
            technologies: '',
            background: '',
            description: '',
            isLoading: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/projects/' + sessionStorage.getItem('email') + '/' + this.props.projectId)
            .then(response => response.json())
            .then(data => this.setState({ ...data, isLoading: false }));
    }

    public handleChange = (id: keyof IProjectState) => (e: React.FormEvent<FormControlProps>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    render() {
        fetch('http://localhost:8080/projects/' + this.state.projectId + '/students')
            .then(response => response.json())
            .then(data => this.setState({ students: data }));

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
                                    value={this.state.projectName}
                                    onChange={this.handleChange('projectName')}
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
                                    onChange={this.handleChange('minSize')}
                                    value={this.state.minSize}
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
                                    id="technologies"
                                    value={this.state.technologies}
                                    placeholder="Technologies expected"
                                    onChange={this.handleChange('technologies')}
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
                                    value={this.state.background}
                                    placeholder="Background requested"
                                    onChange={this.handleChange('background')}
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
                                    id="description"
                                    value={this.state.description}
                                    placeholder="Description"
                                    onChange={this.handleChange('description')}
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
                    </Panel.Body>
                </Panel>
            </Panel>

        );

    }
}

export default ProjectInformation;