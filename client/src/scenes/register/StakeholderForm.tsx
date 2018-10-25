import * as React from 'react';
import autobind from 'autobind-decorator';
import { getApiURI } from '../../common/server';
import { withRouter, RouteComponentProps } from 'react-router';
import { InputType } from 'reactstrap/lib/Input';
import { Card, FormGroup, Button, Intent, InputGroup, Callout, IconName, Toaster, Position } from '@blueprintjs/core';
import { MainToast } from 'components/MainToast';
import { fetchServer } from 'common/server';

interface IStakeholderRegistrationProps extends RouteComponentProps<any> {
}
interface IStakeholderRegistrationState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    password: string;
    confirm: string;

    isLoading: boolean;
    hasError: boolean;
}
class StakeholderRegistrationForm extends React.Component<IStakeholderRegistrationProps, IStakeholderRegistrationState> {
    public state: IStakeholderRegistrationState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        password: '',
        confirm: '',

        isLoading: false,
        hasError: false,
    };

    @autobind
    async submitClicked() {
        if (this.state.isLoading) {
            return;
        }

        this.setState({ isLoading: true });

        const response = await fetchServer('/users/register/stakeholder', 'POST', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            company: this.state.company,
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
            this.props.history.push('/');
        }
    }

    @autobind
    cancelClicked() {
        this.props.history.push('/');
    }

    public handleChange = (id: keyof IStakeholderRegistrationState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    @autobind
    formGroup(type: InputType, id: keyof IStakeholderRegistrationState, label: string, placeholder: string, icon?: IconName) {
        return (
            <div style={{ flex: 1, marginRight: 5 }}>
                <FormGroup label={label} labelFor={id}>
                    <InputGroup
                        type={type}
                        id={id}
                        value={this.state[id] as any}
                        placeholder={placeholder}
                        onChange={this.handleChange(id)}
                        disabled={this.state.isLoading}
                        leftIcon={icon}
                        large={true}
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
                    <h1 style={{ marginTop: 0 }}>Stakeholder Registration</h1>
                    <div style={{ marginRight: -5 }}>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            {this.formGroup('text', 'firstName', 'First Name', 'Hecuba', 'person')}
                            {this.formGroup('text', 'lastName', 'Last Name', 'Queen of Troy')}
                        </div>
                        {this.formGroup('text', 'email', 'Email', 'hecuba@usc.edu', 'envelope')}
                        {this.formGroup('text', 'phone', 'Phone', '(098) 765-4321', 'phone')}
                        {this.formGroup('text', 'company', 'Company/Organization', 'USC Village', 'globe')}
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            {this.formGroup('password', 'password', 'Password', '********', 'lock')}
                            {this.formGroup('password', 'confirm', 'Confirm Password', '********')}
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

export default withRouter(StakeholderRegistrationForm);