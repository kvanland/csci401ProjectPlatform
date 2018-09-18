import * as React from 'react';
import {
    Card,
    Table,
    Alert,
    Button
} from 'reactstrap';
import {
    LinkContainer
} from 'react-router-bootstrap';
import { getApiURI } from '../../../common/server';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardBody from 'reactstrap/lib/CardBody';
const viewIcon = require('../../../svg/viewIcon.svg');
const style = {
    width: 1000,
    float: 'none',
    margin: 'auto'
};
interface IProject {
    projectId: number;
    projectName: string;
    statusId: number;
}

interface IHomeState {
    projects: Array<{}>;
    isLoading: Boolean;
}

interface IHomeProps {
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
            return <p>Loading...</p>;
        }

        return (
            <div style={style as any}>

                <h3>Welcome back!</h3>

                <Card>
                    <CardHeader>
                        <CardTitle componentClass="h3">Your Projects</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <thead>
                                <th>Project</th>
                                <th>Status</th>
                                <th>View/Edit</th>
                            </thead>
                            <tbody>
                                {projects.map((project: IProject, index: number) =>
                                    <tr key={project.projectId}>
                                        <td>{project.projectName}</td>
                                        <td>{this.getStatus(project.statusId)}</td>
                                        <td>
                                            <LinkContainer to={{ pathname: 'stakeholder/project/' + project.projectId }}>
                                                <img src={viewIcon} />
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default StakeholderHome;