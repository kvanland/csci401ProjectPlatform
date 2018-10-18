import * as React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Form,
    FormGroup,
    Input,
} from 'reactstrap';
import { Button, Intent, Icon } from '@blueprintjs/core';

class ClassOverview extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <Form horizontal={true}>
                        <FormGroup>
                            <Input type="text" placeholder="Search..." />
                        </FormGroup>
                        <Button type="submit" intent={Intent.PRIMARY} >Search Assignments</Button>
                    </Form>
                </Card>
                <Card>
                    <CardHeader>Assignments</CardHeader>
                    <CardBody>
                        <Button>Update Selected on Blackboard</Button>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Student</th>
                                    <th>Assignment</th>
                                    <th>Project Name</th>
                                    <th>Date Submitted</th>
                                    <th>Due Date</th>
                                    <th>Recipient</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="checkbox" />&nbsp;</td>
                                    <td>Joan Hong</td>
                                    <td>Peer Review 1</td>
                                    <td>401 Project Platform</td>
                                    <td>2/5/18</td>
                                    <td>2/7/18</td>
                                    <td>Student: Ingrid Wang</td>
                                    <td><Icon icon="eye-open" /></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" />&nbsp;</td>
                                    <td>Nav Pillai</td>
                                    <td>Weekly Status Report 4</td>
                                    <td>401 Project Platform</td>
                                    <td>2/8/18</td>
                                    <td>2/8/18</td>
                                    <td />
                                    <td><Icon icon="eye-open" /></td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ClassOverview;
