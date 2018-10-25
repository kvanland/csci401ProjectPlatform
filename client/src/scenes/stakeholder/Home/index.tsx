import * as React from 'react';
import {
    LinkContainer
} from 'react-router-bootstrap';
import { getApiURI, getUserEmail } from '../../../common/server';
import { HTMLTable, Button, Card, NonIdealState, Intent } from '@blueprintjs/core';
import { RouteComponentProps } from 'react-router';
import { Loading } from 'components/Loading';
import autobind from 'autobind-decorator';
import { fetchServer } from 'common/server';
interface IProject {
    projectId: number;
    projectName: string;
    statusId: number;
    semester: string;
    year: string;
    minSize: number;
}

interface IHomeState {
    projects: Array<{}>;
    isLoading: Boolean;
}

interface IHomeProps extends RouteComponentProps {
}

class StakeholderHome extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            projects: [],
            isLoading: true
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        const response = await fetchServer(`/projects/stakeholder/${getUserEmail()}`, 'GET');

        if (response.ok) {
            const data = await response.json();

            this.setState({
                projects: data,
                isLoading: false
            });
        }
    }

    getStatus(statusId: number) {
        if (statusId === 1) {
            return 'Pending Approval';
        } else if (statusId === 2) {
            return 'Approved';
        } else if (statusId === 3) {
            return 'Rejected';
        } else {
            return 'Changes Requested';
        }
    }

    @autobind
    createNewProposal() {
        this.props.history.push('/stakeholder/proposals');
    }

    render() {
        const { projects, isLoading } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return (
            <div className="csci-container">
                <div className="csci-main">
                    {projects.length > 0 ? (
                        <Card>
                            <h1 style={{ marginTop: 0 }}>Your Projects</h1>
                            <HTMLTable style={{ width: '100%' }} striped={true} bordered={true}>
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Status</th>
                                        <th>Semester</th>
                                        <th>View/Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project: IProject, index: number) =>
                                        <tr key={project.projectId}>
                                            <td>{project.projectName}</td>
                                            <td>{this.getStatus(project.statusId)}</td>
                                            <td>{project.semester}{project.year}</td>
                                            <td>
                                                <Button icon="eye-open" onClick={() => this.props.history.push('/stakeholder/project/' + project.projectId)} />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </HTMLTable>
                        </Card>
                    ) : (
                            <NonIdealState
                                icon="folder-new"
                                title="Empty Project Proposals"
                                description="You haven't submitted any project proposals for CSCI 401."
                                action={<Button intent={Intent.PRIMARY} large={true} text="Create New Proposal" onClick={this.createNewProposal} />}
                            />
                        )}
                </div>
            </div>
        );
    }
}

export default StakeholderHome;