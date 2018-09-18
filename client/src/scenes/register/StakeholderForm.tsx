import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    Input,
    Button,
    Label,
    Row,
    InputProps
} from 'reactstrap';
import autobind from 'autobind-decorator';
import { getApiURI } from '../../common/server';
import { withRouter, RouteComponentProps } from 'react-router';
import { InputType } from 'reactstrap/lib/Input';

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
    formGroup(type: InputType, id: keyof IStakeholderRegistrationState, placeholder: string, value: any) {
        return (
            <FormGroup>
                <Col componentClass={Label} sm={3}>
                    {placeholder}
                </Col>
                <Col sm={8}>
                    <Input
                        type={type}
                        id={id}
                        value={value}
                        placeholder={placeholder}
                        onChange={this.handleChange(id)}
                    />
                </Col>
            </FormGroup>
        );
    }

    render() {
        return (
            <div style={style as any}>
                <h2>Stakeholder Registration</h2>
                <Row>
                    <Col>
                        <div>
                            <Form horizontal={true} >
                                {this.formGroup('text', 'firstName', 'First Name', this.state.firstName)}
                                {this.formGroup('text', 'lastName', 'Last Name', this.state.lastName)}
                                {this.formGroup('text', 'email', 'Email', this.state.email)}
                                {this.formGroup('text', 'phone', 'Phone', this.state.phone)}
                                {this.formGroup('text', 'company', 'Company/Organization', this.state.company)}
                                {this.formGroup('password', 'password', 'Password', this.state.password)}
                                {this.formGroup('password', 'confirm', 'Confirm Password', this.state.confirm)}

                                <FormGroup>
                                    <Col smOffset={3} sm={10}>
                                        <Button type="reset" onClick={this.submitClicked}>Register</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(StakeholderRegistrationForm);