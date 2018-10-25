import * as React from 'react';
import { IUser } from 'common/interfaces';
import autobind from 'autobind-decorator';
import { getApiURI, fetchServer, getUserEmail } from 'common/server';
import { FormGroup, InputGroup, Spinner, NonIdealState, Button, Intent } from '@blueprintjs/core';
import { Loading } from 'components/Loading';

interface IProfileProps {
}
interface IProfileState extends IUser {
    isLoading: boolean;
}
var studentName = '';

class EditProfileForm extends React.Component<IProfileProps, IProfileState> {
    public state: IProfileState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        isLoading: false,
    };

    async componentDidMount() {
        this.setState({ isLoading: true });

        const response = await fetchServer(`/users/${getUserEmail()}`);
        const data = await response.json();

        this.setState({
            ...data,
            isLoading: false
        });
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

    renderFormGroup = (id: keyof IProfileState, label: string, placeholder: string, type: string = 'text') => {
        return (
            <FormGroup label={label} labelFor={id}>
                <InputGroup
                    id={id}
                    value={this.state[id] as any}
                    onChange={this.handleChange(id)}
                    placeholder={placeholder}
                    type={type}
                />
            </FormGroup>
        );
    }

    render() {
        if (this.state.isLoading) {
            return <Loading />;
        }

        return (
            <div>
                {this.renderFormGroup('firstName', 'First Name', 'Tommy')}
                {this.renderFormGroup('lastName', 'Last Name', 'Trojan')}
                {this.renderFormGroup('email', 'Email', 'ttrojan@usc.edu')}
                {this.renderFormGroup('phone', 'Phone', '(123) 456-7890', 'tel')}

                <Button text="Save" intent={Intent.PRIMARY} onClick={this.submitClicked} />
            </div>
        );
    }
}

export default EditProfileForm;