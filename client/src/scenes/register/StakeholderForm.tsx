import * as React from 'react';
import autobind from 'autobind-decorator';
import { getApiURI } from '../../common/server';
import { withRouter, RouteComponentProps } from 'react-router';
import { InputType } from 'reactstrap/lib/Input';
import { Card, FormGroup, Button, Intent, InputGroup } from '@blueprintjs/core';

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
}
class StakeholderRegistrationForm extends React.Component<IStakeholderRegistrationProps, IStakeholderRegistrationState> {
    public state: IStakeholderRegistrationState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        password: '',
        confirm: ''
    };

    @autobind
    async submitClicked() {
        try {
            const request = new Request(getApiURI('/users/stakeholder-registration'));
            await fetch(request, {
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
            this.props.history.push('/');
        } catch (e) {
            console.error(e);
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
                    value={this.state[id]}
                    placeholder={placeholder}
                    onChange={this.handleChange(id)}
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
                        <Button intent={Intent.PRIMARY} text="Register" onClick={this.submitClicked} />
                    </FormGroup>
                </Card>
            </div>
        );
    }
}

export default withRouter(StakeholderRegistrationForm);