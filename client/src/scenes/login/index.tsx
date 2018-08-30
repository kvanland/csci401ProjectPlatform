import * as React from 'react';
import {
    Panel,
    Col,
    Row
} from 'react-bootstrap';
import LoginForm from './Form';

const style = {
    width: 600,
    float: 'none',
    margin: 'auto',
};

class Login extends React.Component {
    render() {
        return (
            <div style={style as any}>
                <h3> Welcome to CSCI 401</h3>
                <Row>
                    <Col>
                        <Panel>
                            <LoginForm/>
                        </Panel>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        Interested in being a stakeholder for a project?
                        <a href="/register/stakeholder"> Register here. </a>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Login;