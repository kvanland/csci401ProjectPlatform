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
    Intent
} from '@blueprintjs/core';
import autobind from 'autobind-decorator';
import { getApiURI } from '../../../common/server';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import YearPicker from 'react-year-picker';

interface IProjectProps {
    projectId: string;
}
interface IProjectState extends IProject {
    students: Array<IStudentInfo>;
    isLoading: Boolean;
    studentNumber: Array<number>;
}

interface IStudentInfo {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
}

@autobind
class ProjectInformation extends React.Component<IProjectProps, IProjectState> {
    public state: IProjectState = {
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
        year: '',
        studentNumber: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    };

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
        try {
            const response = await fetch(getApiURI('/projects/') + this.state.projectId + '/students');
            const data = await response.json();
            this.setState({
                students: data
            });
        } catch (e) {
            console.error(e);
        }
    }

    public handleChange = (id: keyof IProjectState) => (e: React.ChangeEvent<any>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    handleYearChange (date: any) {
        this.state.year = date!;
    }

    @autobind
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

                            <FormGroup label="Project Semester">
                                <HTMLSelect
                                    id="editUserType"
                                    value={this.state.semester}
                                    onChange={this.handleChange('semester')}
                                >
                                    <option defaultValue="SUMMER">SUMMER</option>
                                    <option value="FALL">FALL</option>
                                    <option value="SPRING">SPRING</option>
                                </HTMLSelect>
                            </FormGroup>
                            <YearPicker onChange={this.handleYearChange}/>

                             <FormGroup label="Minimum Size" labelFor="projectSemester">
                                <HTMLSelect
                                    id="editMinSize"
                                    value={this.state.minSize}
                                    onChange={this.handleChange('minSize')}
                                    options={this.state.studentNumber}
                                />
                            </FormGroup>

                            <FormGroup label="Maximum size" labelFor="minSize">
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