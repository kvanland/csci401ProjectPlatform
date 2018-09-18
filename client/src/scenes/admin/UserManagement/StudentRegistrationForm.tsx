import * as React from 'react';
import autobind from 'autobind-decorator';
import { HTMLTable, Button, TextArea } from '@blueprintjs/core';

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
    renderFormGroup(id: string, label: string, placeholder: string) {
        return (
            <tr>
                <td>{label}</td>
                <td>
                    <TextArea
                        id={id}
                        placeholder={placeholder}
                        value={this.state[id]}
                        onChange={this.handleChange(id)}
                        style={{ height: 100 }}
                    />
                </td>
                <td>
                    <Button type="submit" onClick={this.submitClicked}>Send Invites</Button>
                </td>
            </tr>
        );

    }

    render() {
        return (
            <HTMLTable>
                <tbody>
                    {this.renderFormGroup('studentEmails', 'Student Emails', 'ttrojan@usc.edu')}
                    {this.renderFormGroup('adminEmails', 'Admin Emails', 'admin@usc.edu')}
                </tbody>
            </HTMLTable>
        );
    }
}

export default StudentRegistrationForm;