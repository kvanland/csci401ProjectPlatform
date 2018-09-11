import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    FormControl,
    Button,
    ControlLabel,
    FormControlProps
} from 'react-bootstrap';
import autobind from 'autobind-decorator';

interface ILoginProps {
}
interface ILoginState {
    email: string;
    password: string;
    token: string;
}
class LoginForm extends React.Component<ILoginProps, ILoginState> {
    public state: ILoginState = {
        email: '',
        password: '',
        token: ''
    };

    public handleChange = (id: keyof ILoginState) => (e: React.FormEvent<FormControlProps>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    @autobind
    submitClicked() {
        {
            this.getToken(
                function (token: string) {
                    sessionStorage.setItem('jwt', token);
                }
            );
        }
    }

    @autobind
    getToken(callback: any) {
        var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('POST', 'http://localhost:8080/users/login');
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var data = JSON.stringify({
            email: this.state.email,
            password: this.state.password
        });
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.send(data);
        sessionStorage.setItem('email', this.state.email);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText.length > 4) {
                    var resp = request.responseText.split(',', 2);
                    if (resp.length === 2) {
                        var type = resp[1];
                        sessionStorage.setItem('userType', type);
                        if (type === 'Student') {
                            window.location.href = '/student';
                        }
                        if (type === 'Admin') {
                            window.location.href = '/admin';
                        }
                        if (type === 'Stakeholder') {
                            window.location.href = '/stakeholder';
                        }
                        var token = resp[0];
                        callback.apply(this, [token]);

                        alert('Logging you in...');
                    }
                }
            }
        };
    }

    render() {
        return (
            <div>
                <Form horizontal={true} >
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                id="email"
                                value={this.state.email}
                                placeholder="Email"
                                onChange={this.handleChange('email')}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                </Col>
                        <Col sm={10}>
                            <FormControl
                                type="password"
                                placeholder="Password"
                                id="password"
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="reset" onClick={this.submitClicked}>Sign in</Button>
                        </Col>
                    </FormGroup>

                </Form>
            </div>
        );
    }
}

export default LoginForm;
