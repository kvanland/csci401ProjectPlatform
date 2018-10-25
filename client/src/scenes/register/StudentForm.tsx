import * as React from 'react';
import autobind from 'autobind-decorator';
import { getApiURI } from '../../common/server';
import { withRouter, RouteComponentProps } from 'react-router';
import { InputType } from 'reactstrap/lib/Input';
import { Card, FormGroup, InputGroup, Button, Intent, Callout, IconName, Toaster, Position } from '@blueprintjs/core';
import { MainToast } from 'components/MainToast';
import { fetchServer } from 'common/server';

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
    hasError: boolean;
}

@autobind
class StudentRegistrationForm extends React.Component<IStudentRegistrationProps, IStudentRegistrationState> {
    public state: IStudentRegistrationState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirm: '',

        isLoading: false,
        hasError: false,
    };

    async submitClicked() {
        if (this.state.isLoading) {
            return;
        }

        this.setState({ isLoading: true });

        const response = await fetchServer('/users/register/student', 'POST', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password
        });

        if (!response.ok) {
            this.setState({ hasError: true, isLoading: false });
            MainToast.show({
                intent: Intent.DANGER,
                icon: 'error',
                message: 'Could not create an account because a problem occurred.',
            });
        } else {
            await this.setState({ isLoading: false });
            MainToast.show({
                intent: Intent.SUCCESS,
                icon: 'tick',
                message: 'User created, please log in.',
            });

            this.props.history.push('/');
        }
    }

    cancelClicked() {
        this.props.history.push('/');
    }

    public handleChange = (id: keyof IStudentRegistrationState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    formGroup(type: InputType, id: keyof IStudentRegistrationState, label: string, placeholder: string, icon?: IconName) {
        return (
            <div style={{ flex: 1, marginRight: 5 }}>
                <FormGroup label={label} labelFor={id}>
                    <InputGroup
                        large={true}
                        type={type}
                        id={id}
                        value={this.state[id] as any}
                        placeholder={placeholder}
                        onChange={this.handleChange(id)}
                        disabled={this.state.isLoading}
                        leftIcon={icon}
                        intent={this.state.hasError ? Intent.DANGER : Intent.NONE}
                    />
                </FormGroup>
            </div>
        );
    }

    render() {
        return (
            <div id="csci-login-form-container">
                <Card id="csci-login-form">
                    <h1 style={{ marginTop: 0 }}>Student Registration</h1>
                    <div style={{ marginRight: -5 }}>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            {this.formGroup('text', 'firstName', 'First Name', 'Tommy', 'person')}
                            {this.formGroup('text', 'lastName', 'Last Name', 'Trojan')}
                        </div>
                        {this.formGroup('text', 'email', 'Email', 'ttrojan@usc.edu', 'envelope')}
                        {this.formGroup('text', 'phone', 'Phone', '(123) 456-7890', 'phone')}
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            {this.formGroup('password', 'password', 'Password', '********', 'lock')}
                            {this.formGroup('password', 'confirm', 'Confirm', '********')}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button intent={Intent.PRIMARY} text="Register" onClick={this.submitClicked} loading={this.state.isLoading} large={true} />
                        <Button intent={Intent.NONE} text="Cancel" onClick={this.cancelClicked} loading={this.state.isLoading} large={true} />
                    </div>
                </Card>
            </div>
        );
    }
}

export default withRouter(StudentRegistrationForm);