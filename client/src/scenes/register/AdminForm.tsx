import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    Input,
    Button,
    Label,
    InputProps
} from 'reactstrap';
import autobind from 'autobind-decorator';
import { withRouter, RouteComponentProps } from 'react-router';
import { getApiURI } from '../../common/server';
import { InputType } from 'reactstrap/lib/Input';

const style = {
    width: 600,
    float: 'none',
    margin: 'auto',
};

interface IAdminRegistrationProps extends RouteComponentProps<any> {
}
interface IAdminRegistrationState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirm: string;
}
class AdminRegistrationForm extends React.Component<IAdminRegistrationProps, IAdminRegistrationState> {
    public state: IAdminRegistrationState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirm: ''
    };

    @autobind
    async submitClicked() {
        try {
            const request = new Request(getApiURI('/users/register/admin'));
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
                    password: this.state.password
                }),
            });
            this.props.history.push('/');
        } catch (e) {
            console.error(e);
        }
    }

    public handleChange = (id: keyof IAdminRegistrationState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    @autobind
    formGroup(type: InputType, id: keyof IAdminRegistrationState, placeholder: string, value: any) {
        return (
            <FormGroup>
                <Col componentClass={Label} sm={2}>
                    {placeholder}
                </Col>
                <Col sm={10}>
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
                <h2>Admin Registration</h2>
                <Form horizontal={true} >
                    {this.formGroup('text', 'firstName', 'First Name', this.state.firstName)}
                    {this.formGroup('text', 'lastName', 'Last Name', this.state.lastName)}
                    {this.formGroup('text', 'email', 'Email', this.state.email)}
                    {this.formGroup('tel', 'phone', 'Phone', this.state.phone)}
                    {this.formGroup('password', 'password', 'Password', this.state.password)}
                    {this.formGroup('text', 'confirm', 'Confirm Password', this.state.confirm)}

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

export default withRouter(AdminRegistrationForm);