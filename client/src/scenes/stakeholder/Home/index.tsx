import * as React from 'react';
import {
    LinkContainer
} from 'react-router-bootstrap';
import { getApiURI } from '../../../common/server';
import { HTMLTable, Button, Card } from '@blueprintjs/core';
import { RouteComponentProps } from 'react-router';
import { Loading } from 'components/Loading';
interface IProject {
    projectId: number;
    projectName: string;
    statusId: number;
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

        try {
            const response = await fetch(getApiURI('/projects/' + sessionStorage.getItem('email')));
            const data = await response.json();

            this.setState({
                projects: data,
                isLoading: false
            });
        } catch (e) {
            console.error(e);
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

    render() {
        const { projects, isLoading } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return (
            <div className="csci-container">
                <div className="csci-main">

                    <Card>
                        <h1 style={{ marginTop: 0 }}>Your Projects</h1>
                        <HTMLTable style={{ width: '100%' }} striped={true} bordered={true}>
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Status</th>
                                    <th>View/Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project: IProject, index: number) =>
                                    <tr key={project.projectId}>
                                        <td>{project.projectName}</td>
                                        <td>{this.getStatus(project.statusId)}</td>
                                        <td>
                                            <Button icon="eye-open" onClick={() => this.props.history.push('/stakeholder/project/' + project.projectId)} />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </HTMLTable>
                    </Card>
                </div>
            </div>
        );
    }
}

export default StakeholderHome;