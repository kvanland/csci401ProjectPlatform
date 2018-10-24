import * as React from 'react';
import autobind from 'autobind-decorator';
import { FormGroup, Intent, Button, InputGroup, TextArea, Card } from '@blueprintjs/core';
import { fetchServer } from 'common/server';
import { MainToast } from '../../components/MainToast';

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
    async submitClicked() {
        const response = await fetchServer('/peerReviewForm', 'POST', {
            uscusername: this.state.uscusername,
            uscidnumber: this.state.uscidnumber,
            teammateaddress: this.state.teammateaddress,
            teamcount: this.state.teamcount,
            positivefeedback: this.state.positivefeedback,
            negativefeedback: this.state.negativefeedback
        });

        if (response.ok) {
            MainToast.show({
                message: 'Peer Review submitted successfully',
                icon: 'tick',
                intent: Intent.SUCCESS,
            });
        }
    }

    handleChangeInput = (id: keyof IPeerReviewState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    handleChangeTextArea = (id: keyof IPeerReviewState) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    renderInput = (id: keyof IPeerReviewState, label: string, placeholder: string) => {
        return (
            <FormGroup label={label} labelFor={id}>
                <InputGroup
                    id={id}
                    value={this.state[id]}
                    onChange={this.handleChangeInput(id)}
                    placeholder={placeholder}
                />
            </FormGroup>
        );
    }

    renderTextArea = (id: keyof IPeerReviewState, label: string, placeholder: string) => {
        return (
            <FormGroup label={label} labelFor={id}>
                <TextArea
                    id={id}
                    fill={true}
                    value={this.state[id]}
                    onChange={this.handleChangeTextArea(id)}
                    placeholder={placeholder}
                    style={{ minHeight: 100 }}
                />
            </FormGroup>
        );
    }

    render() {
        return (
            <div className="csci-form-container">
                <div className="csci-form-actions">
                    <h1 style={{ margin: 0 }}>Peer Review</h1>
                </div>
                <Card className="csci-form">
                    {this.renderInput('uscusername', 'USC Username', 'ttrojan')}
                    {this.renderInput('uscidnumber', 'USC ID Number', '1234567890')}
                    {this.renderInput('teammateaddress', 'Team Member Email', 'teammate@usc.edu')}
                    {this.renderInput('teamcount', 'Number of Members', 'Number of members including yourself')}
                    {this.renderTextArea('positivefeedback', 'Positive Feedback', 'What positive feedback do you have for this student?')}
                    {this.renderTextArea('negativefeedback', 'Constructive Feedback', 'How can this student improve his/her work on the project?')}
                </Card>
                <div className="csci-form-actions">
                    <Button text="Submit" onClick={this.submitClicked} intent={Intent.PRIMARY} large={true} />
                </div>
            </div>
        );
    }
}

export default PeerReviewForm;
