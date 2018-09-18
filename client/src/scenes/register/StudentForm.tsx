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
import { getApiURI } from '../../common/server';
import { withRouter, RouteComponentProps } from 'react-router';
import { InputType } from 'reactstrap/lib/Input';

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
}
class StudentRegistrationForm extends React.Component<IStudentRegistrationProps, IStudentRegistrationState> {
    public state: IStudentRegistrationState = {
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
            await fetch(getApiURI('/users/student-registration'), {
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

            this.props.history.push('/');
        } catch (e) {
            console.error(e);
        }
    }

    public handleChange = (id: keyof IStudentRegistrationState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    @autobind
    formGroup(type: InputType, id: keyof IStudentRegistrationState, placeholder: string, value: any) {
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
                <h2>Student Registration</h2>
                <Form horizontal={true} >
                    {this.formGroup('text', 'firstName', 'First Name', this.state.firstName)}
                    {this.formGroup('text', 'lastName', 'Last Name', this.state.lastName)}
                    {this.formGroup('text', 'email', 'Email', this.state.email)}
                    {this.formGroup('text', 'phone', 'Phone', this.state.phone)}
                    {this.formGroup('password', 'password', 'Password', this.state.password)}
                    {this.formGroup('password', 'confirm', 'Confirm Password', this.state.confirm)}

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

export default withRouter(StudentRegistrationForm);