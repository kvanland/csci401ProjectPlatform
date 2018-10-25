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
import { getApiURI, fetchServer } from 'common/server';
import { MainToast } from 'components/MainToast';
import * as jwtDecode from 'jwt-decode';
import { IJwtToken } from 'common/interfaces';

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
        const { email: loginEmail, password: loginPassword } = this.state;
        const response = await fetchServer('/users/login', 'POST', { email: loginEmail, password: loginPassword });

        if (!response.ok) {
            await this.setState({ hasError: true, isLoading: false });
            MainToast.show({
                intent: Intent.DANGER,
                icon: 'error',
                message: 'Email or password does not match our records.',
            });
        } else {
            const token = await response.text();
            const jwt: IJwtToken = jwtDecode(token);

            const userEmail = jwt.sub;
            const userType = jwt.auth;

            // set session
            sessionStorage.setItem('jwt', token);
            sessionStorage.setItem('email', userEmail);
            sessionStorage.setItem('userType', userType);

            // redirect to the correct landing page
            if (userType === 'Student') {
                this.props.history.push('/student');
            } else if (userType === 'Admin') {
                this.props.history.push('/admin');
            } else if (userType === 'Stakeholder') {
                this.props.history.push('/stakeholder');
            }
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

    @autobind
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
