import * as React from 'react';

import { getApiURI } from '../../../common/server';
import { InputGroup, FormGroup, HTMLTable, Button, Intent, Card, Dialog, TextArea } from '@blueprintjs/core';
import { Loading } from 'components/Loading';
import autobind from 'autobind-decorator';

interface IProjectListProps {
}

interface IProjectListState {
    projects: Array<{}>;
    isLoading: boolean;
    selected: boolean;
    isOpen: boolean;
    selectedProject: IProject;
    // <Button onClick={this.toggleCheckboxes}>Select All</Button>
}

interface IProject {
    projectId: number;
    projectName: string;
    semester: string;
    statusId: number;
    minSize: string;
    maxSize: string;
    technologies: string;
    background: string;
    description: string;
    projectSemester: string;
}

class ProjectProposalApprovalForm extends React.Component<IProjectListProps, IProjectListState> {
    constructor(props: IProjectListProps) {
        super(props);

        var emptyProject: IProject;
        emptyProject = ({
            projectId: 0,
            projectName: '',
            semester: '',
            statusId: 0,
            minSize: '',
            maxSize: '',
            technologies: '',
            background: '',
            description: '',
            projectSemester: '',
        });
        this.state = {
            projects: [],
            isLoading: false,
            selected: false,
            isOpen: false,
            selectedProject: emptyProject,
        };
        this.submitClicked = this.submitClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleCheckboxes = this.toggleCheckboxes.bind(this);
    }
    submitClicked(projectId: number, type: number) {
        /*var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('POST', 'http://localhost:8080/projectApprovalAttempt/');
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var data = JSON.stringify({
        projects: this.state.projects,
        });
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.send(data); */

        // var request = new Request(getApiURI('/projects'));

        var request = new XMLHttpRequest();
        request.withCredentials = true;
        if (type === 1) {
            request.open('POST', 'http://localhost:8080/projects/pending/' + projectId);
        } else if (type === 2) {
            request.open('POST', 'http://localhost:8080/projects/approve/' + projectId);
        } else if (type === 3) {
            request.open('POST', 'http://localhost:8080/projects/reject/' + projectId);
        } else if (type === 4) {
            request.open('POST', 'http://localhost:8080/projects/change/' + projectId);
        }

        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.send();
    }
    submitProjectEdit() {

        var request = new XMLHttpRequest();
        request.withCredentials = true;

        console.log(this.state.selectedProject);

        request.open('POST', 'http://localhost:8080/projects/edit/' + this.state.selectedProject.projectId);

        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.send(JSON.stringify(this.state.selectedProject));
    }

    handleChange(e: any) {
        let projects = this.state.projects;
        let name = e.target.value;
        {
            projects.map((project: IProject) => {
                if (project.projectName === name && e.target.checked) {
                    project.statusId = 2;
                } else if (project.projectName === name && !e.target.checked) {
                    project.statusId = 1;
                }
            });
        }

        this.setState({
            projects: projects
        });
    }

    handleOpenEditModal = (project) => this.setState({ isOpen: true, selectedProject: project });
    handleCloseEditModal = () => this.setState({ isOpen: false });

    @autobind
    renderFormGroup(id: keyof IProject, type: string, label: string, placeholder: string) {
        return (
            <FormGroup label={label} labelFor={id}>
                <InputGroup
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    // value={(typeof this.state.selectedProject[id] == 'number') ? this.state.selectedProject[id].toString() : this.state.selectedProject[id]}
                    value={(this.state.selectedProject[id] == null) ? '' : this.state.selectedProject[id].toString()}
                    onChange={this.handleProjectEdit(id)}
                />
            </FormGroup>
        );
    }

    handleProjectEdit = (id: keyof IProject) => (e: React.ChangeEvent<any>) => {
        let proj: IProject;
        proj = Object.assign({}, this.state.selectedProject);
        proj[id] = e.currentTarget.value;
        this.setState({ selectedProject: proj } as any);
    }

    toggleCheckboxes() {
        if (this.state.selected === false) {
            this.setState({
                selected: true
            });
        } else {
            this.setState({
                selected: false
            });
        }
    }
    async componentDidMount() {
        this.setState({ isLoading: true });

        try {
            const response = await fetch(getApiURI('/projects'));
            const data = await response.json();

            this.setState({
                projects: data,
                isLoading: false
            });
        } catch (e) {
            console.error(e);
        }
    }

    getStatus(id: number) {
        if (id === 0 || id === 1) {
            return 'Pending Approval';
        } else if (id === 2) {
            return 'Approved';
        } else if (id === 3) {
            return 'Rejected';
        }
        return 'Changes Requested';
    }

    render() {
        const { projects, isLoading } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return (
            <div className="csci-container">
                <div className="csci-main">
                    <Card>
                        <HTMLTable bordered={true} striped={true} style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Project Semester</th>
                                    <th>Project Status</th>
                                    <th>Min Size</th>
                                    <th>Max Size</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project: IProject) =>
                                    <tr key={project.projectId}>
                                        <td>{project.projectName}</td>
                                        <td>{project.semester}</td>
                                        <td>{this.getStatus(project.statusId)}</td>
                                        <td>{project.minSize}</td>
                                        <td>{project.maxSize}</td>
                                        <td>{project.description}</td>
                                        <td>
                                            <Button intent={Intent.SUCCESS} onClick={() => this.submitClicked(project.projectId, 2)}>Approve</Button>
                                            <Button intent={Intent.DANGER} onClick={() => this.submitClicked(project.projectId, 3)}>Reject</Button>
                                            <Button intent={Intent.WARNING} onClick={() => this.submitClicked(project.projectId, 4)}>Change</Button>
                                            <Button onClick={() => this.handleOpenEditModal(project)}>Make Edit</Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <Dialog
                                icon="info-sign"
                                onClose={this.handleCloseEditModal}
                                title="Edit Project Proposal"
                                {...this.state}
                            >

                                <div className={'project-edit-modal-body'}>
                                    <p>
                                        <strong>
                                            Make edit to project proposal here.
                            </strong>
                                    </p>

                                    <div>
                                        {this.renderFormGroup('projectName', 'text', 'Project Name', 'Project Name')}
                                        {this.renderFormGroup('semester', 'text', 'Project Semester', 'Project Semester')}
                                        {this.renderFormGroup('minSize', 'text', 'Number of Students', 'Number of Students')}
                                        {this.renderFormGroup('maxSize', 'text', 'Number of Students', 'Number of Students')}
                                        {this.renderFormGroup('technologies', 'text', 'Technologies Expected', 'Technologies Expected')}
                                        {this.renderFormGroup('background', 'text', 'Background Requested', 'Background Requested')}
                                        {this.renderFormGroup('description', 'text', 'Project Description', 'Project Description')}

                                        <Button intent={Intent.WARNING} onClick={() => this.submitProjectEdit()}>Submit Changes</Button>
                                        {/* <FormGroup label="Description" labelFor="description">
                                            <TextArea
                                                placeholder="Description"
                                                id="description"
                                                value={this.state.description}
                                                onChange={this.handleChange('description')}
                                            />
                                        </FormGroup> */}

                                        {/* <FormGroup>
                                            <Button intent={Intent.PRIMARY} text="Submit Proposal" onClick={this.submitClicked} />
                                        </FormGroup> */}
                                    </div>
                                </div>
                            </Dialog>
                        </HTMLTable>
                    </Card>
                </div>
            </div >);
    }
}

export default ProjectProposalApprovalForm;
