import * as React from 'react';
import autobind from 'autobind-decorator';
import { Button, TextArea, HTMLSelect, HTMLTable, NonIdealState, Intent, FormGroup, Toaster, Position, Classes } from '@blueprintjs/core';
import { fetchServer } from 'common/server';
import { MainToast } from 'components/MainToast';

interface IStudentRegistrationProps {
}
interface IStudentRegistrationState {
    inviteState: InviteState;
    userType: UserType;
    emailsRaw: string;
    emailsParsed: string[];
    isLoading: boolean;
    semesterType: SemesterType;
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

enum SemesterType {
    FALL = 'FALL',
    SPRING = 'SPRING',
    SUMMER = 'SUMMER'
}

@autobind
class StudentRegistrationForm extends React.Component<IStudentRegistrationProps, IStudentRegistrationState> {
    constructor(props: IStudentRegistrationProps) {
        super(props);
        this.state = {
            inviteState: InviteState.Initial,
            userType: UserType.Student,
            emailsRaw: '',
            emailsParsed: [],
            isLoading: false,
            semesterType: SemesterType.FALL,
        };
    }

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

    async sendInvites() {
        await this.setState({
            isLoading: true,
        });

        try {
            await fetchServer('/users/invite/students', 'POST', {
                emails: this.state.emailsParsed.join('\n'),
            });
            this.setState({
                inviteState: InviteState.Done,
            });
        } catch (e) {
            console.error(e);
            MainToast.show({
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

    handleChangeEmails(e: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({
            emailsRaw: e.currentTarget.value,
        });
    }

    handleChangeUserType(e: React.FormEvent<HTMLSelectElement>) {
        this.setState({
            userType: e.currentTarget.value as UserType,
        });
    }

    handleChangeSemesterType(e: React.FormEvent<HTMLSelectElement>) {
        this.setState({
            semesterType: e.currentTarget.value as SemesterType,
        });
    }

    renderForm() {
        return (
            <React.Fragment>
                <div className={Classes.DIALOG_BODY}>
                    <FormGroup label="Type of User">
                        <table>
                            <tr>
                                <td>
                                    <HTMLSelect value={this.state.userType} onChange={this.handleChangeUserType} disabled={this.state.isLoading}>
                                        <option value={UserType.Student}>Students</option>
                                        <option value={UserType.Admin} disabled={true}>Admins</option>
                                    </HTMLSelect>
                                </td>
                                <td>
                                    <HTMLSelect value={this.state.semesterType} onChange={this.handleChangeSemesterType} disabled={this.state.isLoading}>
                                        <option value={SemesterType.FALL}>FALL</option>
                                        <option value={SemesterType.SPRING}>SPRING</option>
                                        <option value={SemesterType.SUMMER}>SUMMER</option>
                                    </HTMLSelect>
                                </td>
                            </tr>
                        </table>

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
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button
                            text="Next"
                            rightIcon="arrow-right"
                            intent={Intent.PRIMARY}
                            onClick={this.confirmEmails}
                            loading={this.state.isLoading}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderConfirm() {
        return (
            <React.Fragment>
                <div className={Classes.DIALOG_BODY}>
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
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button
                            text="Send Invites"
                            icon="envelope"
                            intent={Intent.PRIMARY}
                            onClick={this.sendInvites}
                            loading={this.state.isLoading}
                            disabled={this.state.emailsParsed.length === 0}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }

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