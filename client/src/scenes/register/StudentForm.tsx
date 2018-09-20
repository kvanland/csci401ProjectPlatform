import * as React from 'react';
import autobind from 'autobind-decorator';
import { getApiURI } from '../../common/server';
import { withRouter, RouteComponentProps } from 'react-router';
import { InputType } from 'reactstrap/lib/Input';
import { Card, FormGroup, InputGroup, Button, Intent, Callout } from '@blueprintjs/core';

const style = {
    width: 600,
    float: 'none',
    margin: 'auto',
};

interface IStudentRegistrationProps extends RouteComponentProps<any> {
}
interface IStudentRegistrationState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirm: string;

    isLoading: boolean;
    error: string;
}
class StudentRegistrationForm extends React.Component<IStudentRegistrationProps, IStudentRegistrationState> {
    public state: IStudentRegistrationState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirm: '',

        isLoading: false,
        error: '',
    };

    @autobind
    async submitClicked() {
        if (this.state.isLoading) {
            return;
        }

        this.setState({ isLoading: true, error: '' });

        try {
            const response = await fetch(getApiURI('/users/student-registration'), {
                method: 'POST',
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    phone: this.state.phone,
                    password: this.state.password
                }),
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw Error(response.statusText);
            }

            this.props.history.push('/');
        } catch (e) {
            console.error(e);
            await this.setState({ error: 'Registration could not be completed.' });
        } finally {
            this.setState({ isLoading: false });
        }
    }

    public handleChange = (id: keyof IStudentRegistrationState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    @autobind
    formGroup(type: InputType, id: keyof IStudentRegistrationState, label: string, placeholder: string) {
        return (
            <FormGroup label={label} labelFor={id}>
                <InputGroup
                    type={type}
                    id={id}
                    value={this.state[id] as any}
                    placeholder={placeholder}
                    onChange={this.handleChange(id)}
                    disabled={this.state.isLoading}
                />
            </FormGroup>
        );
    }

    render() {
        return (
            <div id="csci-login-form-container">
                <Card id="csci-login-form">
                    <h1 style={{ marginTop: 0 }}>Student Registration</h1>
                    {this.formGroup('text', 'firstName', 'First Name', 'Tommy')}
                    {this.formGroup('text', 'lastName', 'Last Name', 'Trojan')}
                    {this.formGroup('text', 'email', 'Email', 'ttrojan@usc.edu')}
                    {this.formGroup('text', 'phone', 'Phone', '(123) 456-7890')}
                    {this.formGroup('password', 'password', 'Password', '********')}
                    {this.formGroup('password', 'confirm', 'Confirm Password', '********')}

                    <FormGroup>
                        <Button intent={Intent.PRIMARY} text="Register" onClick={this.submitClicked} loading={this.state.isLoading} />
                    </FormGroup>

                    {this.state.error !== '' && (
                        <Callout intent={Intent.DANGER}>
                            An error occurred: {this.state.error}
                        </Callout>
                    )}
                </Card>
            </div>
        );
    }
}

export default withRouter(StudentRegistrationForm);