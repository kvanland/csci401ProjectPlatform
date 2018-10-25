import * as React from 'react';
import { IProject } from '../../../common/interfaces';
import {
    FormGroup,
    InputGroup,
    TextArea,
    Button,
    Label,
    Card,
    HTMLTable,
    HTMLSelect,
    Intent,
    Toaster,
    Position,
} from '@blueprintjs/core';
import autobind from 'autobind-decorator';
import { getApiURI, getUserEmail } from '../../../common/server';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import { fetchServer } from 'common/server';

const FormToast = Toaster.create({
    position: Position.TOP,
});

interface IProjectProps {
    projectId: string;
}

interface IProjectState extends IProject {
    students: Array<IStudentInfo>;
    isLoading: Boolean;
    studentNumber: number[];
    listOfYears: string[];
}

interface IStudentInfo {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
}

@autobind
class ProjectInformation extends React.Component<IProjectProps, IProjectState> {
    constructor(props: IProjectProps) {
        super(props);

        const numbers: number[] = [];

        for (var i = 0; i < 21; i++) {
            numbers.push(i);
        }

        const years: string[] = [];
        const currYear = (new Date()).getFullYear();

        for (var j = 0; j < 5; j++) {
            years.push((currYear - 2 + j).toString());
        }

        this.state = {
            students: [],
            projectId: 0,
            projectName: '',
            minSize: '',
            technologies: '',
            background: '',
            description: '',
            isLoading: true,
            members: [],
            semester: '',
            year: years[0],
            studentNumber: numbers,
            listOfYears: years,
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        await this.fetchStakeholderProject();
        await this.fetchStudentsAssignments();

        this.setState({ isLoading: false });
    }

    async fetchStakeholderProject() {
        const response = await fetchServer(`/projects/stakeholder/${getUserEmail()}/${this.props.projectId}`);
        const data = await response.json();

        await this.setState({
            ...data,
        });
    }

    async fetchStudentsAssignments() {
        const response = await fetchServer(`/projects/${this.props.projectId}/students`);
        const data = await response.json();

        await this.setState({
            students: data,
        });
    }

    public handleChange = (id: keyof IProjectState) => (e: React.ChangeEvent<any>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    /*     @autobind
        async submitProjectEdit() {
            var request = new XMLHttpRequest();
            request.withCredentials = true;
    
            request.open('POST', 'http://localhost:8080/projects/editMinor/' + this.state.projectId);
    
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            request.setRequestHeader('Cache-Control', 'no-cache');
            request.send(JSON.stringify(this.state));
            request.onreadystatechange = function () {
                if (this.readyState === this.DONE) {
                    if (request.status === 200) {
                        alert('Change made successfully');
                    } else {
                        alert('Change could not be made at this time');
                    }
                }
            };
        } */

    async submitProjectEdit() {

        const response = await fetchServer(`/projects/edit/${this.state.projectId}`, 'POST', this.state);

        if (response.ok) {
            FormToast.show({
                intent: Intent.SUCCESS,
                icon: 'tick',
                message: 'Project has been updated successfully!',
            });
        } else {
            FormToast.show({
                intent: Intent.SUCCESS,
                icon: 'error',
                message: 'Change could not be made at this time',
            });
        }
    }

    render() {
        return (
            <div className="csci-form-container">
                <div className="csci-main">
                    <h1 style={{ margin: 0, textAlign: 'center' }}>Project Information</h1>
                    <Card>
                        <CardBody>
                            <FormGroup label="Project Name">

                                <InputGroup
                                    type="text"
                                    id="projectName"
                                    value={this.state.projectName}
                                    onChange={this.handleChange('projectName')}
                                    placeholder="Project Name"
                                />
                            </FormGroup>

                            <FormGroup label="Minimum Size" labelFor="minSize">
                                <HTMLSelect
                                    id="editMinSize"
                                    value={this.state.minSize}
                                    onChange={this.handleChange('minSize')}
                                    options={this.state.studentNumber}
                                />
                            </FormGroup>

                            <FormGroup label="Maximum size" labelFor="maxSize">
                                <HTMLSelect
                                    id="editMaxSize"
                                    value={this.state.maxSize}
                                    onChange={this.handleChange('maxSize')}
                                    options={this.state.studentNumber}
                                />
                            </FormGroup>

                            <FormGroup label="Technologies Expected">
                                <InputGroup
                                    type="text"
                                    id="technologies"
                                    value={this.state.technologies}
                                    placeholder="Technologies expected"
                                    onChange={this.handleChange('technologies')}
                                />
                            </FormGroup>

                            <FormGroup label="Background Requested">

                                <InputGroup
                                    type="text"
                                    id="backgroundRequested"
                                    value={this.state.background}
                                    placeholder="Background requested"
                                    onChange={this.handleChange('background')}
                                />
                            </FormGroup>

                            <FormGroup label="Description">

                                <InputGroup
                                    // componentClass="textarea"
                                    type="text"
                                    id="description"
                                    value={this.state.description}
                                    placeholder="Description"
                                    onChange={this.handleChange('description')}
                                />
                            </FormGroup>

                            <FormGroup label="Project Semester">
                                <table>
                                    <tr>
                                        <td>
                                            <HTMLSelect
                                                id="editSemester"
                                                value={this.state.semester}
                                                onChange={this.handleChange('semester')}
                                            >
                                                <option value="SUMMER">SUMMER</option>
                                                <option value="FALL">FALL</option>
                                                <option value="SPRING">SPRING</option>
                                            </HTMLSelect>
                                        </td>
                                        <td>
                                            <HTMLSelect
                                                id="editYear"
                                                value={this.state.year}
                                                onChange={this.handleChange('year')}
                                                options={this.state.listOfYears}
                                            />
                                        </td>
                                    </tr>
                                </table>
                            </FormGroup>

                            <FormGroup>
                                <Button
                                    type="submit"
                                    onClick={this.submitProjectEdit}
                                    text="Edit/Save"
                                />
                            </FormGroup>
                        </CardBody>
                        <Card>
                            <CardHeader>
                                Team Contact Information
                    </CardHeader>
                            <CardBody>
                                <div>
                                    <HTMLTable bordered={true}>
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
                                </div>
                            </CardBody>
                        </Card>
                    </Card>
                </div>
            </div >
        );

    }
}

export default ProjectInformation;