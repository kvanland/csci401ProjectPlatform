import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    FormControl,
    Button,
    ControlLabel
} from 'react-bootstrap';
const style = {
    width: 600,
    float: 'none',
    margin: 'auto',
};

interface AdminRegistrationProps {
}
interface AdminRegistrationState {
firstName: string;
lastName: string;
email: string;
phone: string;
password: string;
confirm: string;
}
class AdminRegistrationForm extends React.Component<AdminRegistrationProps, AdminRegistrationState> {
constructor(props: AdminRegistrationProps) {
super(props);
this.state = {
firstName: '',
lastName: '',
email: '',
phone: '',
password: '',
confirm: ''
};
this.submitClicked = this.submitClicked.bind(this);
this.handleChange = this.handleChange.bind(this);
}
submitClicked() {
    var request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open('POST', 'http://localhost:8080/users/admin-registration');
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    var data = JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password
    });
    request.setRequestHeader('Cache-Control', 'no-cache');
    request.send(data);
    request.onreadystatechange = function() {
        window.location.href = '/';
    };
    
}

handleChange(e: any) {
this.setState({ [e.target.id]: e.target.value });
}

formGroup(controlId: string, type: string, id: string, placeholder: string, value: any) {
    return (
        <FormGroup controlId={controlId}>
            <Col componentClass={ControlLabel} sm={2}>
            {placeholder}
            </Col>
            <Col sm={10}>
            <FormControl
                type={type}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={e => this.handleChange(e)}
            />
            </Col>
        </FormGroup>
    );
    
}

    render() {
        return (
            <div style={style as any}>
            <h2>Admin Registration</h2>
            <Form horizontal={true} >
            {this.formGroup('formHorizontalName', 'text', 'name', 'First Name', this.state.firstName)}
            {this.formGroup('formHorizontalName', 'text', 'name', 'Last Name', this.state.lastName)}
            {this.formGroup('formHorizontalEmail', 'text', 'email', 'Email', this.state.email)}
            {this.formGroup('formHorizontalPhone', 'phone', 'phone', 'Phone', this.state.phone)}
            {this.formGroup('formHorizontalPassword', 'password', 'password', 'Password', this.state.password)}
            {this.formGroup('formHorizontalConfirm', 'text', 'confirm', 'Confirm Password', this.state.confirm)}

            <FormGroup>
                <Col smOffset={2} sm={10}>
                <Button type="reset" onClick={this.submitClicked}>Register</Button>
                </Col>
            </FormGroup>
        </Form>
        </div>
        );
    }
}

export default AdminRegistrationForm;