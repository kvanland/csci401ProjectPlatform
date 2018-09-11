import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    FormControl,
    Button,
    ControlLabel,
    FormControlProps
} from 'react-bootstrap';

interface IPeerReviewProps {
}

interface IPeerReviewState {
    uscusername: string;
    uscidnumber: string;
    teammateaddress: string;
    teamcount: string;
    positivefeedback: string;
    negativefeedback: string;
}
class PeerReviewForm extends React.Component<IPeerReviewProps, IPeerReviewState> {
    constructor(props: IPeerReviewProps) {
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
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                alert('Peer Review submission SUCCESSFUL!');
            }
        };

    }

    public handleChange = (id: keyof IPeerReviewState) => (e: React.FormEvent<FormControlProps>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    renderFormGroup = (id: keyof IPeerReviewState, label: string, placeholder: string, controlId: string, componentClass?: string) => {
        return (
            <FormGroup controlId={controlId}>
                <Col componentClass={ControlLabel} sm={2}>
                    <b>{label}</b>
                </Col>
                <Col sm={10}>
                    <FormControl
                        componentClass={componentClass}
                        type="text"
                        id={id}
                        value={this.state[id]}
                        onChange={this.handleChange(id)}
                        placeholder={placeholder}
                    />
                </Col>
            </FormGroup>
        );
    }

    render() {
        return (
            <Form horizontal={true} >
                {this.renderFormGroup('uscusername', 'USC Username', 'ttrojan', 'formHorizontalUsername')}
                {this.renderFormGroup('uscidnumber', 'USC ID Number', '1234567890', 'formHorizontalUscidnumber')}
                {this.renderFormGroup('teammateaddress', 'Team Member Email', 'teammate@usc.edu', 'formHorizontalteammateaddress')}
                {this.renderFormGroup('teamcount', 'Number of Members', 'Number of members including yourself', 'formHorizontalteamcount')}
                {this.renderFormGroup('positivefeedback', 'Positive Feedback', 'What positive feedback do you have for this student?', 'formHorizontalPositiveFeedback')}
                {this.renderFormGroup('negativefeedback', 'Constructive Feedback', 'How can this student improve his/her work on the project?', 'formHorizontalNegativeFeedback')}

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
