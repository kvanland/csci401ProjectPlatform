import * as React from 'react';
import autobind from 'autobind-decorator';
import {
    Form,
    FormGroup,
    Col,
    Input,
    Button,
    Label,
    InputProps
} from 'reactstrap';

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
    public state: IPeerReviewState = {
        uscusername: '',
        teammateaddress: '',
        negativefeedback: '',
        uscidnumber: '',
        teamcount: '',
        positivefeedback: '',
    };

    @autobind
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

    public handleChange = (id: keyof IPeerReviewState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    renderFormGroup = (id: keyof IPeerReviewState, label: string, placeholder: string, componentClass?: string) => {
        return (
            <FormGroup>
                <Col componentClass={Label} sm={2}>
                    <b>{label}</b>
                </Col>
                <Col sm={10}>
                    <Input
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
                {this.renderFormGroup('uscusername', 'USC Username', 'ttrojan')}
                {this.renderFormGroup('uscidnumber', 'USC ID Number', '1234567890')}
                {this.renderFormGroup('teammateaddress', 'Team Member Email', 'teammate@usc.edu')}
                {this.renderFormGroup('teamcount', 'Number of Members', 'Number of members including yourself')}
                {this.renderFormGroup('positivefeedback', 'Positive Feedback', 'What positive feedback do you have for this student?')}
                {this.renderFormGroup('negativefeedback', 'Constructive Feedback', 'How can this student improve his/her work on the project?')}

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
