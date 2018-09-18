import * as React from 'react';
import { IProject } from '../../../common/interfaces';
import {
    Form,
    FormGroup,
    Col,
    Input,
    Button,
    Label,
    Card,
    Table,
    InputProps
} from 'reactstrap';
import { getApiURI } from '../../../common/server';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';

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

    async componentDidMount() {
        try {
            const response = await fetch(getApiURI('/projects/') + sessionStorage.getItem('email') + '/' + this.props.projectId);
            const data = await response.json();

            this.setState({
                ...data,
                isLoading: false
            });
        } catch (e) {
            console.log(e);
        }
    }

    public handleChange = (id: keyof IProjectState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    async render() {

        try {
            const response = await fetch(getApiURI('/projects/') + this.state.projectId + '/students');
            const data = await response.json();

            this.setState({
                students: data
            });
        } catch (e) {
            console.error(e);
        }

        return (
            <Card>
                <CardHeader>Project Information</CardHeader>
                <CardBody>
                    <Form horizontal={true} >
                        <FormGroup>
                            <Col componentClass={Label} sm={2}>
                                <b>Project Name</b>
                            </Col>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    id="projectName"
                                    value={this.state.projectName}
                                    onChange={this.handleChange('projectName')}
                                    placeholder="Project Name"
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={Label} sm={2}>
                                <b>Number of Students</b>
                            </Col>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    id="projectSize"
                                    placeholder="Number of Students"
                                    onChange={this.handleChange('minSize')}
                                    value={this.state.minSize}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={Label} sm={2}>
                                <b>Technologies Expected</b>
                            </Col>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    id="technologies"
                                    value={this.state.technologies}
                                    placeholder="Technologies expected"
                                    onChange={this.handleChange('technologies')}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={Label} sm={2}>
                                <b>Background Requested</b>
                            </Col>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    id="backgroundRequested"
                                    value={this.state.background}
                                    placeholder="Background requested"
                                    onChange={this.handleChange('background')}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={Label} sm={2}>
                                <b>Description</b>
                            </Col>
                            <Col sm={10}>
                                <Input
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
                </CardBody>
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
            </Card>

        );

    }
}

export default ProjectInformation;