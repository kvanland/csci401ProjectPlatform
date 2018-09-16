import * as React from 'react';
import {
    Panel,
    Button,
    Table,
    Form,
    FormGroup,
    Col,
    FormControl,
    ControlLabel,
    FormControlProps
} from 'react-bootstrap';
import { IUser } from '../../../common/interfaces';
import autobind from 'autobind-decorator';

import { getApiURI } from '../../../common/server';
const style = {
    width: 1000,
    float: 'none',
    margin: 'auto'
};
interface IProfileProps {
}
interface IProfileState extends IUser {
    isLoading: boolean;
}
var studentName = '';

class StudentProfile extends React.Component<IProfileProps, IProfileState> {
    public state: IProfileState = {
        firstName: '',
        email: '',
        phone: '',
        isLoading: false,
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        
        try {
            const response = await fetch(getApiURI('/users/') + sessionStorage.getItem('email'));
            const data = await response.json();

            this.setState({
                ...data,
                isLoading: false
            });
        } catch (e) {
            console.error(e);
        }

    }

    @autobind
    submitClicked() {
        /*     var request = new XMLHttpRequest();
             request.withCredentials = true;
             request.open('POST', 'http://localhost:8080//');
             request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
             var data = JSON.stringify({
                 fullName: this.state.name,
                 email: this.state.email,
                 phone: this.state.phone
             });
             request.setRequestHeader('Cache-Control', 'no-cache');
             request.send(data);
             alert(request.responseText + 'Logging you in...');
             request.onreadystatechange = function() {
                 if (request.readyState === 4) {
                 }
             }; */
    }

    public handleChange = (id: keyof IProfileState) => (e: React.FormEvent<FormControlProps>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    renderFormGroup = (id: keyof IUser, label: string, placeholder: string, formType: string = 'text', componentClass?: string) => {
        return (
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    <b>{label}</b>
                </Col>
                <Col sm={10}>
                    <FormControl
                        componentClass={componentClass}
                        type={formType}
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
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div style={style as any}>
                <Panel>
                    <Panel.Heading>Profile</Panel.Heading>
                    <Panel.Body>
                        <Form horizontal={true}>
                            {this.renderFormGroup('firstName', 'First Name', 'Tommy')}
                            {this.renderFormGroup('email', 'Email', 'ttrojan@usc.edu')}
                            {this.renderFormGroup('phone', 'Phone', '(123) 456-7890', 'tel')}

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit" bsStyle="primary" onClick={this.submitClicked}>Edit/Save Profile</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

export default StudentProfile;