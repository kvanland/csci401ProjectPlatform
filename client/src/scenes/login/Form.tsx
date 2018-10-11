import * as React from 'react';
import {
    FormGroup,
    InputGroup,
    Button,
    Intent,
    HotkeysTarget,
    Hotkeys,
    Hotkey,
    Toaster,
    Position,
} from '@blueprintjs/core';
import autobind from 'autobind-decorator';
import { withRouter, RouteComponentProps } from 'react-router';
import { getApiURI } from '../../common/server';

const LoginToast = Toaster.create({
    position: Position.TOP,
});

interface ILoginProps extends RouteComponentProps<any> {
}
interface ILoginState {
    email: string;
    password: string;
    isLoading: boolean;
    hasError: boolean;
}

@HotkeysTarget
class LoginForm extends React.Component<ILoginProps, ILoginState> {
    state: ILoginState = {
        email: '',
        password: '',
        isLoading: false,
        hasError: false,
    };

    private passwordInputRef: HTMLInputElement | null = null;
    private emailInputRef: HTMLInputElement | null = null;

    componentDidMount() {
        if (this.emailInputRef) {
            this.emailInputRef.select();
        }
    }

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

            if (!response.ok) {
                throw Error(response.statusText);
            }

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
            await this.setState({ hasError: true, isLoading: false });
            LoginToast.show({
                intent: Intent.DANGER,
                icon: 'error',
                message: 'Email or password does not match our records.',
            });
        }
    }

    @autobind
    setEmailInputRef(ref: HTMLInputElement) {
        this.emailInputRef = ref;
    }

    @autobind
    setPasswordInputRef(ref: HTMLInputElement) {
        this.passwordInputRef = ref;
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
                        leftIcon="envelope"
                        inputRef={this.setEmailInputRef}
                        large={true}
                        disabled={this.state.isLoading}
                        id="email-input"
                        placeholder="ttrojan@usc.edu"
                        onChange={this.handleChange('email')}
                        intent={this.state.hasError ? Intent.DANGER : Intent.NONE}
                    />
                </FormGroup>
                <FormGroup
                    label="Password"
                    labelFor="password-input"
                >
                    <InputGroup
                        leftIcon="lock"
                        inputRef={this.setPasswordInputRef}
                        disabled={this.state.isLoading}
                        id="password-input"
                        type="password"
                        placeholder="********"
                        onChange={this.handleChange('password')}
                        large={true}
                        intent={this.state.hasError ? Intent.DANGER : Intent.NONE}
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
