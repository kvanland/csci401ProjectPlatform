import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    FormControl,
    Button,
    ControlLabel
} from 'react-bootstrap';

interface PeerReviewProps {
}

interface PeerReviewState {
uscusername: string;
uscidnumber: string;
teammateaddress: string;
teamcount: string;
positivefeedback: string;
negativefeedback: string;
}
class PeerReviewForm extends React.Component<PeerReviewProps, PeerReviewState> {
constructor(props: PeerReviewProps) {
super(props);
this.state = {
uscusername: '',
teammateaddress: '',
negativefeedback: '',
uscidnumber: '',
teamcount: '',
positivefeedback: '',
};
this.submitClicked = this.submitClicked.bind(this);
this.handleChange = this.handleChange.bind(this);
}
submitClicked() {

var request = new XMLHttpRequest();
request.withCredentials = true;
request.open('POST', 'http://localhost:8080/peerReviewForm/');
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
var data = JSON.stringify({
uscusername: this.state.uscusername,
uscidnumber: this.state.uscidnumber,
teammateaddress: this.state.teammateaddress,
teamcount: this.state.teamcount,
positivefeedback: this.state.positivefeedback,
negativefeedback: this.state.negativefeedback
});
request.setRequestHeader('Cache-Control', 'no-cache');
request.send(data);
alert(request.responseText + 'Your request has been submitted!');
request.onreadystatechange = function() {
if (request.readyState === 4) {
    alert('Peer Review submission SUCCESSFUL!');
}
};

}

handleChange(e: any) {
this.setState({ [e.target.id]: e.target.value });
}

render() {
        return (
            <Form horizontal={true} >

            <FormGroup controlId="formHorizontalUsername">
                <Col componentClass={ControlLabel} sm={2}>
                <b>USC Username</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="uscusername"
                    onChange={e => this.handleChange(e)}
                    value={this.state.uscusername}
                    placeholder="ttrojan"
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalUscidnumber">
                <Col componentClass={ControlLabel} sm={2}>
                <b>USC ID Number</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="uscidnumber"
                    onChange={e => this.handleChange(e)}
                    value={this.state.uscidnumber}
                    placeholder="1234567890"
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalteammateaddress">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Team Member Email</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="teammateaddress"
                    onChange={e => this.handleChange(e)}
                    value={this.state.teammateaddress}
                    placeholder="Please enter your teammate's USC email address"
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalteamcount">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Number of members</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="teamcount"
                    onChange={e => this.handleChange(e)}
                    value={this.state.teamcount}
                    placeholder="Number of members including yourself"
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPositiveFeedback">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Positive Feedback</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="positivefeedback"
                    value={this.state.positivefeedback}
                    placeholder="What positive feedback do you have for this student? "
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalNegativeFeedback">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Negative Feedback</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="negativefeedback"
                    onChange={e => this.handleChange(e)}
                    value={this.state.negativefeedback}
                    placeholder="How can this student improve his/her work on the project?"
                />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                <Button type="submit" onClick={this.submitClicked}>Submit</Button>
                </Col>
            </FormGroup>
        </Form>
        );
    }
}

export default PeerReviewForm;
