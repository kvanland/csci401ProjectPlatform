import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import StudentForm from './StudentForm';
import StakeholderForm from './StakeholderForm';
import AdminForm from './AdminForm';

class Register extends React.Component {
    render() {
        return (
            <div className="csci-root">
                <div className="content">
                    <Route path="/register/student" component={StudentForm} />
                    <Route path="/register/stakeholder" component={StakeholderForm} />
                    <Route path="/register/admin" component={AdminForm} />
                </div>
            </div>

        );
    }
}

export default Register;