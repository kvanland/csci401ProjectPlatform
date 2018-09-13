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
import { withRouter, RouteComponentProps } from 'react-router';
import { getApiURI } from '../../common/server';

interface ILoginProps extends RouteComponentProps<any> {
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
    async submitClicked() {
        try {
            const response = await fetch(getApiURI('/users/login'), {
                method: 'POST',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }),
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                credentials: 'include'
            });

            if (response.body === null) {
                throw Error('invalid server response: null');
            }

            const responseData = (await response.text()).split(',', 2);
            if (responseData.length !== 2) {
                throw Error(`invalid server response: ${responseData}`);
            }

            const userToken = responseData[0];
            const userType = responseData[1];

            // set session
            sessionStorage.setItem('email', this.state.email);
            sessionStorage.setItem('jwt', userToken);
            sessionStorage.setItem('userType', userType);

            // redirect to the correct landing page
            if (userType === 'Student') {
                this.props.history.push('/student');
            } else if (userType === 'Admin') {
                this.props.history.push('/admin');
            } else if (userType === 'Stakeholder') {
                this.props.history.push('/stakeholder');
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div>
                <Form horizontal={true} >
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Email</Col>
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

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Password</Col>
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

export default withRouter(LoginForm);
