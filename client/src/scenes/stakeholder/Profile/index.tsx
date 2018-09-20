import * as React from 'react';
import { IUser } from '../../../common/interfaces';
import { getApiURI } from '../../../common/server';
import { FormGroup, InputGroup, Card, Button, Intent } from '@blueprintjs/core';
import autobind from 'autobind-decorator';
import { Loading } from '../../../components/Loading';
const style = {
    width: 1000,
    float: 'none',
    margin: 'auto'
};

interface IProfileProps {
}
interface IProfileState extends IUser {
    isLoading: boolean;
}

class StakeholderProfile extends React.Component<IProfileProps, IProfileState> {
    state: IProfileState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        isLoading: false,
    };

    async componentDidMount() {
        this.setState({ isLoading: true });

        try {
            const response = await fetch(getApiURI('/users/' + sessionStorage.getItem('email')));
            const data = await response.json();
            console.log(data);

            this.setState({
                ...data,
                isLoading: false
            });
        } catch (e) {
            console.error(e);
        }
        /*var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('GET', 'http://localhost:8080/users/' + sessionStorage.getItem('email'));
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.send();

        var that = this;
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                var response = request.responseText;
                var jsonResponse = JSON.parse(response);
                var firstNameLiteral = 'firstName';
                var emailLiteral = 'email';
                var phoneLiteral = 'phone';
                var companyLiteral = 'companyName';
                that.setState({
                    name: jsonResponse[firstNameLiteral], 
                    email: jsonResponse[emailLiteral],
                    phone: jsonResponse[phoneLiteral],
                    company: jsonResponse[companyLiteral],
                    isLoading: false
                });
            }
        };*/
    }

    @autobind
    submitClicked() {
        /*     var request = new XMLHttpRequest();
             request.withCredentials = true;
             request.open('POST', 'http://localhost:8080//');
             request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
             var data = JSON.stringify({
                 fullName: this.state.name,
                 email: this.state.email,
                 phone: this.state.phone
             });
             request.setRequestHeader('Cache-Control', 'no-cache');
             request.send(data);
             alert(request.responseText + 'Logging you in...');
             request.onreadystatechange = function() {
                 if (request.readyState === 4) {
                 }
             }; */
    }

    public handleChange = (id: keyof IProfileState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    @autobind
    renderFormGroup(id: keyof IProfileState, type: string, label: string, placeholder: string) {
        return (
            <FormGroup label={label} labelFor={id}>
                <InputGroup
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    value={this.state[id] as any}
                    onChange={this.handleChange(id)}
                />
            </FormGroup>
        );
    }

    render() {
        if (this.state.isLoading) {
            return <Loading />;
        }

        return (
            <div className="csci-container">
                <div className="csci-main">
                    <Card>
                        <h1 style={{ marginTop: 0 }}>Profile</h1>
                        {this.renderFormGroup('firstName', 'text', 'First Name', 'Tommy')}
                        {this.renderFormGroup('lastName', 'text', 'Last Name', 'Trojan')}
                        {this.renderFormGroup('email', 'email', 'Email', 'ttrojan@usc.edu')}
                        {this.renderFormGroup('organization', 'text', 'Company/Organization', 'USC Viterbi')}
                        {this.renderFormGroup('phone', 'tel', 'Phone', '(123) 456-7890')}

                        <FormGroup>
                            <Button text="Edit/Save Profile" intent={Intent.PRIMARY} />
                        </FormGroup>
                    </Card>
                </div>
            </div>
        );
    }
}

export default StakeholderProfile;