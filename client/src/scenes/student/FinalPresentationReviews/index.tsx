import * as React from 'react';
import {
    Panel,
    Button,
    Form,
    FormGroup,
    Col,
    FormControl,
    ControlLabel   
} from 'react-bootstrap';

class FinalPresentationReviews extends React.Component {
    render() {
        return (
            <div>
            <Panel>
            <Panel.Heading>
                Final Presentation Review
            </Panel.Heading>
            <Panel.Body>
            <Form horizontal={true}>
                <FormGroup controlId="formHorizontalProjectName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Project Name:
                    </Col>
                    <Col sm={10}>
                        <FormControl type="text" />
                    </Col>             
                </FormGroup>
                
                <FormGroup controlId="formHorizontalReview">
                    <Col componentClass={ControlLabel} sm={2}>
                        Review:
                    </Col>
                    <Col sm={10}>
                        <FormControl componentClass="textarea" />
                    </Col>    
                </FormGroup>
                
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit" bsStyle="primary">Submit</Button>
                    </Col>
                </FormGroup>               
            </Form>    
            </Panel.Body>
            </Panel>

            <Panel>
              <Panel.Heading>
                  Submitted Reviews
              </Panel.Heading>
              <Panel.Body>
                  <Panel>Project Name</Panel>
              </Panel.Body>
          </Panel>
        </div>
        );
    }
}

export default FinalPresentationReviews;