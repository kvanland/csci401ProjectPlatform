import * as React from 'react';
import { Card, Callout } from '@blueprintjs/core';
import LoginForm from './Form';

const style = {
    width: 600,
    float: 'none',
    margin: 'auto',
};

class Login extends React.Component {
    render() {
        return (
            <div id="csci-login-form-container">
                <Card id="csci-login-form">
                    <h1> Welcome to CSCI 401</h1>
                    <LoginForm />

                    <Callout>
                        <p>
                            Interested in being a stakeholder for a project?
                        <a href="/register/stakeholder"> Register here. </a>
                        </p>
                    </Callout>
                </Card>
            </div>
        );
    }
}

export default Login;