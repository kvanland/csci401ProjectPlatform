import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    Input,
    Button,
    Label,
    Row
} from 'reactstrap';
import autobind from 'autobind-decorator';

interface IStudentRegistrationProps {
}
interface IStudentRegistrationState {
    studentEmails: string;
    adminEmails: string;
}
class StudentRegistrationForm extends React.Component<IStudentRegistrationProps, IStudentRegistrationState> {
    constructor(props: IStudentRegistrationProps) {
        super(props);
        this.state = {
            studentEmails: '',
            adminEmails: ''
        };
    }

    @autobind
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
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                alert('Invites sent succesfully!');
            }
        };
    }

    handleChange = (id: string) => (e: React.FormEvent<any>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    @autobind
    formGroup(id: string, placeholder: string, value: any) {
        return (
            <FormGroup>
                <Row>
                    <Col componentClass={Label} sm={2}>
                        {placeholder}
                    </Col>
                    <Col sm={7}>
                        <Input
                            type="text"
                            componentClass="textarea"
                            id={id}
                            placeholder={placeholder}
                            value={value}
                            onChange={this.handleChange(id)}
                            style={{ height: 100 }}
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
                    {this.formGroup('studentEmails', 'Student Emails', this.state.studentEmails)}
                    {this.formGroup('adminEmails', 'Admin Emails', this.state.adminEmails)}
                </Form>
            </div>
        );
    }
}

export default StudentRegistrationForm;