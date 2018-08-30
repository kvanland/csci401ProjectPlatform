import * as React from 'react';
import {
    Panel,
    Table,
    Button
} from 'react-bootstrap';

interface Deliverable {
    id: number;
    name: string;
    description: string;
    status: string;
    submitDateTime: Date;
}
interface DeliverableProps {
    projectId: string;
}

interface DeliverableState {
    deliverables: Array<{}>;
    isLoading: boolean;
}

class DeliverableList extends React.Component<DeliverableProps, DeliverableState> {

    constructor(props: DeliverableProps) {
        super(props);
        
        this.state = {
            deliverables: [],
            isLoading: false
        };
    }

    approveDeliverable(deliverableNumber: number) {
        var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('POST', 'http://localhost:8080/deliverables/' + this.props.projectId + '/' + deliverableNumber + '/approve');
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var data = JSON.stringify({
            status: 'Approved'
        });
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.send(data);
    }

    rejectDeliverable(deliverableNumber: number) {
        var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('POST', 'http://localhost:8080/deliverables/' + this.props.projectId + '/' + deliverableNumber + '/reject');
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var data = JSON.stringify({
            status: 'Rejected'
        });
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.send(data);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        
        fetch('http://localhost:8080/deliverables/' + this.props.projectId)
            .then(response => response.json())
            .then(data => this.setState({deliverables: data, isLoading: false}));
    }

    render() {
        const {deliverables, isLoading} = this.state;
        
        if (isLoading) {
            return <p>Loading...</p>;
        }
        return(
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Projects</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Table>
                        <thead>
                            <th>Deliverable Number</th>
                            <th>Submission Date</th>
                            <th>Download</th>
                            <th>Approve</th>
                        </thead>
                        <tbody>
                            {deliverables.map((deliverable: Deliverable) =>
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
                </Panel.Body>
            </Panel>
        );
    }
}

export default DeliverableList;