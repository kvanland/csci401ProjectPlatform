import * as React from 'react';

import { fetchServer } from 'common/server';
import { InputGroup, FormGroup, HTMLTable, Button, Intent, Card, Dialog, TextArea, ButtonGroup, HTMLSelect, Tag } from '@blueprintjs/core';
import { Loading } from 'components/Loading';
import autobind from 'autobind-decorator';
import { EditProjectForm } from './EditProjectForm';
import { IProject } from 'common/interfaces';

interface IProjectListProps {
}

interface IProjectListState {
    projects: IProject[];
    isLoading: boolean;
    selected: boolean;
    editingProjectId?: number;
    // <Button onClick={this.toggleCheckboxes}>Select All</Button>
}

@autobind
class ProjectProposalApprovalForm extends React.Component<IProjectListProps, IProjectListState> {
    public state: IProjectListState = {
        projects: [],
        isLoading: false,
        selected: false,
        editingProjectId: undefined,
    };

    async submitClicked(projectId: number, type: number) {
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

        switch (type) {
            case 1:
                await fetchServer(`/projects/pending/${projectId}`, 'POST');
                break;
            case 2:
                await fetchServer(`/projects/approve/${projectId}`, 'POST');
                break;
            case 3:
                await fetchServer(`/projects/reject/${projectId}`, 'POST');
                break;
            case 4:
                await fetchServer(`/projects/change/${projectId}`, 'POST');
                break;
            default:
        }

        this.fetchProjects();
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

    handleOpenEditModal = (projectId: number) => () => this.setState({ editingProjectId: projectId });
    handleCloseEditModal = () => this.setState({ editingProjectId: undefined });

    handleEditProjectSuccess() {
        this.fetchProjects();
        this.handleCloseEditModal();
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

    async fetchProjects() {
        try {
            const response = await fetchServer('/projects');
            const data = await response.json() as IProject[];

            this.setState({
                projects: data,
                isLoading: false
            });
        } catch (e) {
            console.error(e);
        }
    }

    async componentDidMount() {
        await this.setState({ isLoading: true });
        this.fetchProjects();
    }

    getStatus(id: number | undefined) {
        switch (id) {
            case 0:
            case 1:
                return <Tag minimal={true} intent={Intent.PRIMARY}>Pending Approval</Tag>;
            case 2:
                return <Tag minimal={true} intent={Intent.SUCCESS}>Approved</Tag>;
            case 3:
                return <Tag minimal={true} intent={Intent.DANGER}>Rejected</Tag>;
            default:
                return <Tag minimal={true} intent={Intent.WARNING}>Changes Requested</Tag>;
        }
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
                                    <th>Project</th>
                                    <th>Semester</th>
                                    <th>Status</th>
                                    <th># Students</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map(this.renderProjectRow)}
                            </tbody>
                        </HTMLTable>
                    </Card>
                </div>
                {this.renderDialog()}
            </div>
        );
    }

    renderProjectRow(project: IProject) {
        return (
            <tr key={project.projectId} >
                <td>
                    <b>{project.projectName}</b>
                    <p>{project.description}</p>
                </td>
                <td>{project.semester}{project.year}</td>
                <td>{this.getStatus(project.statusId)}</td>
                <td>{project.minSize}–{project.maxSize}</td>
                <td style={{ textAlign: 'right' }}>
                    <ButtonGroup>
                        <Button intent={Intent.SUCCESS} onClick={() => this.submitClicked(project.projectId, 2)}>Approve</Button>
                        <Button intent={Intent.DANGER} onClick={() => this.submitClicked(project.projectId, 3)}>Reject</Button>
                        <Button intent={Intent.WARNING} onClick={() => this.submitClicked(project.projectId, 4)}>Request Change</Button>
                        <Button onClick={this.handleOpenEditModal(project.projectId)} icon="edit">Edit</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    }

    renderDialog() {
        const { editingProjectId: projectId, projects } = this.state;

        const project = projects.find((p: IProject) => {
            return p.projectId === projectId;
        });

        if (project === undefined) {
            return;
        }

        return (
            <Dialog
                icon="edit"
                onClose={this.handleCloseEditModal}
                title="Edit Project Proposal"
                isOpen={projectId !== undefined}
            >

                {projectId !== undefined && <EditProjectForm project={project} editProjectSuccess={this.handleEditProjectSuccess} />}
            </Dialog>
        );
    }
}

export default ProjectProposalApprovalForm;
