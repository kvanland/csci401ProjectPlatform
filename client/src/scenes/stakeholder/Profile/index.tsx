import * as React from 'react';
import { IUser } from '../../../common/interfaces';
import { getApiURI, fetchServer, getUserEmail } from '../../../common/server';
import { FormGroup, InputGroup, Card, Button, Intent, IconName, Toaster, Position } from '@blueprintjs/core';
import autobind from 'autobind-decorator';
import { Loading } from 'components/Loading';
import { MainToast } from '../../../components/MainToast';

interface IProfileProps {
}
interface IProfileState extends IUser {
    isLoading: boolean;
    originalEmail: string;
}

class StakeholderProfile extends React.Component<IProfileProps, IProfileState> {
    state: IProfileState = {
        originalEmail: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        userType: '',
        organization: '',
        semester: '',
        isLoading: false,
    };

    async componentDidMount() {
        await this.setState({ isLoading: true });
        await this.fetchProfileData();
        await this.setState({ isLoading: false });
    }

    @autobind
    async fetchProfileData() {

        const response = await fetchServer('/users/' + getUserEmail());
        if (response.ok) {
            const data = await response.json();
            this.setState({
                ...data,
                originalEmail: data.email,
            });
        } else {
            MainToast.show({
                message: 'An error occurred: could not retrieve stakeholder profile.',
                intent: Intent.DANGER,
                icon: 'error',
            });
        }
    }

    @autobind
    async submitClicked() {
        await this.setState({ isLoading: true });

        try {
            const { originalEmail, email, firstName, lastName, userType, semester, phone } = this.state;
            await fetchServer('/users/update-info', 'POST', {
                originalEmail,
                email,
                firstName,
                lastName,
                userType,
                phone,
                semester,
            });
            await this.fetchProfileData();
            this.setState({ isLoading: false });
        } catch (e) {
            this.setState({ isLoading: false });
            MainToast.show({
                message: 'An error occurred: could not update profile.',
                intent: Intent.DANGER,
                icon: 'error',
            });
        }
    }

    public handleChange = (id: keyof IProfileState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    @autobind
    formGroup(type: string, id: keyof IProfileState, label: string, placeholder: string, icon?: IconName) {
        return (
            <div style={{ flex: 1, marginRight: 5 }}>
                <FormGroup label={label} labelFor={id}>
                    <InputGroup
                        type={type}
                        placeholder={placeholder}
                        id={id}
                        value={this.state[id] as any || ''}
                        onChange={this.handleChange(id)}
                        leftIcon={icon}
                        large={true}
                    />
                </FormGroup>
            </div>
        );
    }

    render() {
        if (this.state.isLoading) {
            return <Loading />;
        }

        return (
            <div className="csci-form-container">
                <div className="csci-form-actions">
                    <h1 style={{ margin: 0 }}>Stakeholder Profile</h1>
                </div>
                <Card className="csci-form">
                    <div style={{ marginRight: -5 }}>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            {this.formGroup('text', 'firstName', 'First Name', 'Hecuba', 'person')}
                            {this.formGroup('text', 'lastName', 'Last Name', 'Queen of Troy')}
                        </div>
                        {this.formGroup('text', 'email', 'Email', 'hecuba@usc.edu', 'envelope')}
                        {this.formGroup('text', 'phone', 'Phone', '(098) 765-4321', 'phone')}
                        {this.formGroup('text', 'organization', 'Company/Organization', 'USC Village', 'globe')}
                    </div>
                </Card>
                <div className="csci-form-actions">
                    <Button text="Save Profile" intent={Intent.PRIMARY} large={true} onClick={this.submitClicked} />
                </div>
            </div>
        );
    }
}

export default StakeholderProfile;