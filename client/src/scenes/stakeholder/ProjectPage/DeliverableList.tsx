import * as React from 'react';
import {
    Card,
    Table,
    Button
} from 'reactstrap';
import { getApiURI } from '../../../common/server';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardBody from 'reactstrap/lib/CardBody';
import { Loading } from 'components/Loading';
import { fetchServer } from 'common/server';

interface IDeliverable {
    id: number;
    name: string;
    description: string;
    status: string;
    submitDateTime: Date;
}
interface IDeliverableProps {
    projectId: string;
}

interface IDeliverableState {
    deliverables: Array<{}>;
    isLoading: boolean;
}

class DeliverableList extends React.Component<IDeliverableProps, IDeliverableState> {

    constructor(props: IDeliverableProps) {
        super(props);

        this.state = {
            deliverables: [],
            isLoading: false
        };
    }

    approveDeliverable(deliverableNumber: number) {
        const { projectId } = this.props;
        fetchServer(`/deliverables/${projectId}/${deliverableNumber}/approve`, 'POST', { status: 'Approved' });
    }

    rejectDeliverable(deliverableNumber: number) {
        const { projectId } = this.props;
        fetchServer(`/deliverables/${projectId}/${deliverableNumber}/reject`, 'POST', { status: 'Rejected' });
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        const response = await fetchServer('/deliverables/' + this.props.projectId);
        const data = await response.json();

        this.setState({
            deliverables: data,
            isLoading: false
        });

    }

    render() {
        const { deliverables, isLoading } = this.state;

        if (isLoading) {
            return <Loading />;
        }
        return (
            <Card>
                <CardHeader>
                    <CardTitle componentClass="h3">Projects</CardTitle>
                </CardHeader>
                <CardBody>
                    <Table>
                        <thead>
                            <th>Deliverable Number</th>
                            <th>Submission Date</th>
                            <th>Download</th>
                            <th>Approve</th>
                        </thead>
                        <tbody>
                            {deliverables.map((deliverable: IDeliverable) =>
                                <tr key={deliverable.id}>
                                    <td>Deliverable {deliverable.id}</td>
                                    <td>{deliverable.submitDateTime}</td>
                                    <td><Button>Download</Button></td>
                                    <td>
                                        <Button onClick={() => this.approveDeliverable(deliverable.id)}>Approve</Button>
                                        <Button onClick={() => this.rejectDeliverable(deliverable.id)}>Reject</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}

export default DeliverableList;