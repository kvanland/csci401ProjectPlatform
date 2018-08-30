import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    FormControl,
    Button,
    ControlLabel,
    Row
} from 'react-bootstrap';

interface StudentRegistrationProps {
}
interface StudentRegistrationState {
studentEmails: string;
adminEmails: string;
}
class StudentRegistrationForm extends React.Component<StudentRegistrationProps, StudentRegistrationState> {
constructor(props: StudentRegistrationProps) {
super(props);
this.state = {
studentEmails: '',
adminEmails: ''
};
this.submitClicked = this.submitClicked.bind(this);
this.handleChange = this.handleChange.bind(this);
}
submitClicked() {
var request = new XMLHttpRequest();
request.withCredentials = true;
request.open('POST', 'http://localhost:8080/users/student-emails-registration');
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
var data = JSON.stringify({
emails: this.state.studentEmails,
});
request.setRequestHeader('Cache-Control', 'no-cache');
request.send(data);
alert(request.responseText + 'Sending out invites...');
request.onreadystatechange = function() {
if (request.readyState === 4) {
    alert('Invites sent succesfully!');
}
};
}

handleChange(e: any) {
this.setState({ [e.target.id]: e.target.value });
}

formGroup(controlId: string, id: string, placeholder: string, value: any) {
    return (
        <FormGroup controlId={controlId}>
            <Row>
            <Col componentClass={ControlLabel} sm={2}>
            {placeholder}
            </Col>
            <Col sm={7}>
            <FormControl
                type="text"
                componentClass="textarea"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={e => this.handleChange(e)}
                style={{height: 100}}
            />
            </Col>
            <Col sm={1}>
                <Button type="submit" onClick={this.submitClicked}>Send Invites</Button>
            </Col>
            </Row>
        </FormGroup>
    );
    
}

    render() {
        return (
            <div>
            <Form horizontal={true} >
            {this.formGroup('formHorizontalEmails', 'studentEmails', 'Student Emails', this.state.studentEmails)}
            {this.formGroup('formHorizontalAdminEmails', 'adminEmails', 'Admin Emails', this.state.adminEmails)}
        </Form>
        </div>
        );
    }
}

export default StudentRegistrationForm;