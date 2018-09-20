import * as React from 'react';
import {
    FormGroup,
    InputGroup,
    Button,
    Intent,
    HotkeysTarget,
    Hotkeys,
    Hotkey,
} from '@blueprintjs/core';
import autobind from 'autobind-decorator';
import { withRouter, RouteComponentProps } from 'react-router';
import { getApiURI } from '../../common/server';

interface ILoginProps extends RouteComponentProps<any> {
}
interface ILoginState {
    email: string;
    password: string;
    isLoading: boolean;
}

@HotkeysTarget
class LoginForm extends React.Component<ILoginProps, ILoginState> {
    public state: ILoginState = {
        email: '',
        password: '',
        isLoading: false,
    };

    public handleChange = (id: keyof ILoginState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    @autobind
    async submit() {
        await this.setState({ isLoading: true });
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
        } finally {
            this.setState({ isLoading: false });
        }
    }

    renderHotkeys() {
        return (
            <Hotkeys>
                <Hotkey combo="enter" label="Submit login form" onKeyDown={this.submit} allowInInput={true} />
            </Hotkeys>
        );
    }

    render() {
        return (
            <div>
                <FormGroup
                    label="Email"
                    labelFor="email-input"
                >
                    <InputGroup
                        large={true}
                        disabled={this.state.isLoading}
                        id="email-input"
                        placeholder="ttrojan@usc.edu"
                        onChange={this.handleChange('email')}
                    />
                </FormGroup>
                <FormGroup
                    label="Password"
                    labelFor="password-input"
                >
                    <InputGroup
                        disabled={this.state.isLoading}
                        id="password-input"
                        type="password"
                        placeholder="********"
                        onChange={this.handleChange('password')}
                        large={true}
                    />
                </FormGroup>

                <FormGroup>
                    <Button
                        large={true}
                        intent={Intent.PRIMARY}
                        onClick={this.submit}
                        loading={this.state.isLoading}
                        text="Sign In"
                    />
                </FormGroup>
            </div>
        );
    }
}

export default withRouter(LoginForm);
