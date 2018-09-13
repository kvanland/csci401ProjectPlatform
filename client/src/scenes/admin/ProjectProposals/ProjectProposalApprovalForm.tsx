import * as React from 'react';

import {
    Button,
    Table,
    Form,
    FormGroup,
    FormControl
} from 'react-bootstrap';

interface IProjectListProps {
}

interface IProjectListState {
    projects: Array<{}>;
    isLoading: boolean;
    selected: boolean;
    // <Button onClick={this.toggleCheckboxes}>Select All</Button>
}

interface IProject {
    projectId: number;
    projectName: string;
    statusId: number;
    minSize: string;
    maxSize: string;
    technologies: string;
    background: string;
    description: string;
}

class ProjectProposalApprovalForm extends React.Component<IProjectListProps, IProjectListState> {
    constructor(props: IProjectListProps) {
        super(props);

        this.state = {
            projects: [],
            isLoading: false,
            selected: false,
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
    componentDidMount() {
        this.setState({ isLoading: true });

        fetch('http://localhost:8080/projects')
            .then(response => response.json())
            .then(data => this.setState({ projects: data, isLoading: false }));
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
            return <p>Loading...</p>;
        }

        return (
            <div style={{ margin: 'auto', float: 'none', width: 1500 }}>
                <h2>Project Proposals</h2>
                <Form>
                    <Table bordered={true}>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Project Name</th>
                                <th>Project Status</th>
                                <th>Min Size</th>
                                <th>Max Size</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project: IProject) =>
                                <tr key={project.projectId}>
                                    <td>
                                        <Button type="submit" bsStyle="success" onClick={() => this.submitClicked(project.projectId, 2)}>Approve</Button>
                                        <Button type="submit" bsStyle="danger" onClick={() => this.submitClicked(project.projectId, 3)}>Reject</Button>
                                        <Button type="submit" bsStyle="warning" onClick={() => this.submitClicked(project.projectId, 4)}>Changes</Button>

                                    </td>
                                    <td>{project.projectName}</td>
                                    <td>{this.getStatus(project.statusId)}</td>
                                    <td>{project.minSize}</td>
                                    <td>{project.maxSize}</td>
                                    <td>{project.description}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Form>
            </div>);
    }
}

export default ProjectProposalApprovalForm;
