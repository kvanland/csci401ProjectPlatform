import * as React from 'react';
import autobind from 'autobind-decorator';
import { getApiURI } from '../../common/server';
import { withRouter, RouteComponentProps } from 'react-router';
import { InputType } from 'reactstrap/lib/Input';
import { Card, FormGroup, Button, Intent, InputGroup, Callout } from '@blueprintjs/core';

const style = {
    width: 600,
    float: 'none',
    margin: 'auto',
};

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
    error: string;
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
        error: '',
    };

    @autobind
    async submitClicked() {
        if (this.state.isLoading) {
            return;
        }

        this.setState({ isLoading: true, error: '' });

        try {
            const response = await fetch(getApiURI('/users/stakeholder-registration'), {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Cache-Control': 'no-cache',
                },
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    phone: this.state.phone,
                    company: this.state.company,
                    password: this.state.password
                }),
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

    public handleChange = (id: keyof IStakeholderRegistrationState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    @autobind
    formGroup(type: InputType, id: keyof IStakeholderRegistrationState, label: string, placeholder: string) {
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
                    <h1 style={{ marginTop: 0 }}>Stakeholder Registration</h1>

                    {this.formGroup('text', 'firstName', 'First Name', 'Hecuba')}
                    {this.formGroup('text', 'lastName', 'Last Name', 'Queen of Troy')}
                    {this.formGroup('text', 'email', 'Email', 'hecuba@usc.edu')}
                    {this.formGroup('text', 'phone', 'Phone', '(098) 765-4321')}
                    {this.formGroup('text', 'company', 'Company/Organization', 'USC Village')}
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

export default withRouter(StakeholderRegistrationForm);