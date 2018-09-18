import * as React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Form,
    FormGroup,
    Col,
    Input,
    Label
} from 'reactstrap';

class FinalPresentationReviews extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <CardHeader>Final Presentation Review</CardHeader>
                    <CardBody>
                        <Form horizontal={true}>
                            <FormGroup>
                                <Col componentClass={Label} sm={2}>
                                    Project Name:
                    </Col>
                                <Col sm={10}>
                                    <Input type="text" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={Label} sm={2}>
                                    Review:
                                </Col>
                                <Col sm={10}>
                                    <Input componentClass="textarea" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit" bsStyle="primary">Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        Submitted Reviews
              </CardHeader>
                    <CardBody>
                        <Card>Project Name</Card>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default FinalPresentationReviews;