import * as React from 'react';
import autobind from 'autobind-decorator';
import { Button, TextArea, HTMLSelect, HTMLTable, NonIdealState, Intent, FormGroup, Toaster, Position } from '@blueprintjs/core';
import { fetchServer } from 'common/server';

interface IStudentRegistrationProps {
}
interface IStudentRegistrationState {
    inviteState: InviteState;
    userType: UserType;
    emailsRaw: string;
    emailsParsed: string[];
    isLoading: boolean;
}
enum InviteState {
    Initial,
    Confirm,
    Done,
}
enum UserType {
    Student = 'student',
    Admin = 'admin',
}

const FormToast = Toaster.create({
    position: Position.TOP,
});

class StudentRegistrationForm extends React.Component<IStudentRegistrationProps, IStudentRegistrationState> {
    constructor(props: IStudentRegistrationProps) {
        super(props);
        this.state = {
            inviteState: InviteState.Initial,
            userType: UserType.Student,
            emailsRaw: '',
            emailsParsed: [],
            isLoading: false,
        };
    }

    @autobind
    async confirmEmails() {
        await this.setState({
            isLoading: true,
        });

        let emails = this.state.emailsRaw.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        emails = Array.from(new Set(emails));

        this.setState({
            emailsParsed: emails,
            inviteState: InviteState.Confirm,
            isLoading: false,
        });
    }

    @autobind
    async sendInvites() {
        await this.setState({
            isLoading: true,
        });

        try {
            await fetchServer('/users/student-emails-registration', 'POST', {
                emails: this.state.emailsParsed.join('\n'),
            });
            this.setState({
                inviteState: InviteState.Done,
            });
        } catch (e) {
            console.error(e);
            FormToast.show({
                intent: Intent.DANGER,
                icon: 'error',
                message: 'Could not send invites to email addresses.',
            });
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }

    @autobind
    handleChangeEmails(e: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({
            emailsRaw: e.currentTarget.value,
        });
    }

    @autobind
    handleChangeUserType(e: React.FormEvent<HTMLSelectElement>) {
        this.setState({
            userType: e.currentTarget.value as UserType,
        });
    }

    @autobind
    renderForm() {
        return (
            <div>
                <FormGroup label="Type of User">
                    <HTMLSelect value={this.state.userType} onChange={this.handleChangeUserType} disabled={this.state.isLoading}>
                        <option value={UserType.Student}>Students</option>
                        <option value={UserType.Admin} disabled={true}>Admins</option>
                    </HTMLSelect>
                </FormGroup>
                <FormGroup label="List of email addresses">
                    <TextArea
                        fill={true}
                        disabled={this.state.isLoading}
                        placeholder="email@usc.edu, ..."
                        value={this.state.emailsRaw}
                        onChange={this.handleChangeEmails}
                        style={{ minHeight: 150 }}
                    />
                </FormGroup>
                <Button
                    text="Next"
                    rightIcon="arrow-right"
                    intent={Intent.PRIMARY}
                    onClick={this.confirmEmails}
                    loading={this.state.isLoading}
                />
            </div>
        );
    }

    @autobind
    renderConfirm() {
        return (
            <div>
                <Button
                    text="Go Back"
                    icon="arrow-left"
                    minimal={true}
                    onClick={() => this.setState({ inviteState: InviteState.Initial })}
                />
                {this.state.emailsParsed.length === 0 ? (
                    <div style={{ marginTop: 20, marginBottom: 20 }}>
                        <NonIdealState icon="error" title="Could Not Parse Emails" />
                    </div>
                ) : (
                        <div style={{ backgroundColor: 'white', marginTop: 20, marginBottom: 20, maxHeight: 350, overflow: 'auto' }}>
                            <HTMLTable condensed={true} striped={true} style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <td>Emails</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.emailsParsed.map((email) => (
                                        <tr key={email}>
                                            <td>{email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </HTMLTable>
                        </div>
                    )}
                <Button
                    text="Send Invites"
                    icon="tick"
                    intent={Intent.PRIMARY}
                    onClick={this.sendInvites}
                    loading={this.state.isLoading}
                    disabled={this.state.emailsParsed.length === 0}
                />
            </div>
        );
    }

    @autobind
    renderSuccessful() {
        return (
            <NonIdealState
                icon="tick-circle"
                title="Invitations Sent"
                description={`${this.state.emailsParsed.length} ${this.state.userType === UserType.Student ? 'students' : 'admins'} were successfully added.`}
            />
        );
    }

    render() {
        switch (this.state.inviteState) {
            case InviteState.Initial:
                return this.renderForm();
            case InviteState.Confirm:
                return this.renderConfirm();
            case InviteState.Done:
                return this.renderSuccessful();
            default:
                return <div />;
        }
    }
}

export default StudentRegistrationForm;