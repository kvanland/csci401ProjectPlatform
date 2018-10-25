import * as React from 'react';
import { Card, Callout } from '@blueprintjs/core';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

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
                    <h1 style={{ marginTop: 0 }}>Welcome to CSCI 401</h1>
                    <LoginForm />

                    <Callout>
                        Not registered? <Link to="/register/student">I'm a student</Link> or <Link to="/register/stakeholder">I'm a stakeholder</Link>.
                    </Callout>
                </Card>
            </div>
        );
    }
}

export default Login;