import * as React from 'react';
import { FormGroup, HTMLSelect, Button, Intent, InputGroup, Toaster, Position, Classes } from '@blueprintjs/core';
import autobind from 'autobind-decorator';
import { IProject } from 'common/interfaces';
import { fetchServer } from 'common/server';
import YearPicker from 'react-year-picker';
import { MainToast } from '../../../components/MainToast';

interface IEditProjectFormProps {
    project: IProject;
    editProjectSuccess: () => any;
}

interface IEditProjectFormState extends IProject {
}

@autobind
export class EditProjectForm extends React.PureComponent<IEditProjectFormProps, IEditProjectFormState> {
    public state: IEditProjectFormState = {
        ...this.props.project,
    };

    async submitProjectEdit() {

        const response = await fetchServer(`/projects/edit/${this.state.projectId}`, 'POST', this.state);

        if (response.ok) {
            MainToast.show({
                intent: Intent.SUCCESS,
                icon: 'tick',
                message: 'Project has been updated successfully!',
            });
            this.props.editProjectSuccess();
        } else {
            MainToast.show({
                intent: Intent.SUCCESS,
                icon: 'error',
                message: 'Change could not be made at this time',
            });
        }
    }

    componentDidUpdate(oldProps: IEditProjectFormProps) {
        if (oldProps.project !== this.props.project) {
            this.setState({
                ...this.props.project,
            });
        }
    }

    handleChange = (id: keyof IProject) => (e: React.FormEvent<any>) => {
        this.setState({
            [id]: e.currentTarget.value,
        } as any);
    }

    handleYearChange(date: any) {
        this.state.year = date!;
    }

    renderFormGroup(id: keyof IProject, type: string, label: string, placeholder: string) {
        return (
            <FormGroup label={label} labelFor={id}>
                <InputGroup
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    value={this.state[id] ? this.state[id]!.toString() : ''}
                    onChange={this.handleChange(id)}
                />
            </FormGroup>
        );
    }

    render() {
        return (
            <React.Fragment>
                <div className={Classes.DIALOG_BODY}>
                    {this.renderFormGroup('projectName', 'text', 'Project Name', 'Project Name')}
                    <FormGroup label="Semester" labelFor="semester">
                        <HTMLSelect
                            id="semester"
                            value={this.state.semester}
                            onChange={this.handleChange('semester')}
                        >
                            <option value="SUMMER">SUMMER</option>
                            <option value="FALL">FALL</option>
                            <option value="SPRING">SPRING</option>
                        </HTMLSelect>
                    </FormGroup>
                    <YearPicker onChange={this.handleYearChange} />
                    {this.renderFormGroup('minSize', 'text', 'Number of Students', 'Number of Students')}
                    {this.renderFormGroup('maxSize', 'text', 'Number of Students', 'Number of Students')}
                    {this.renderFormGroup('technologies', 'text', 'Technologies Expected', 'Technologies Expected')}
                    {this.renderFormGroup('background', 'text', 'Background Requested', 'Background Requested')}
                    {this.renderFormGroup('description', 'text', 'Project Description', 'Project Description')}
                    {/* <FormGroup label="Description" labelFor="description">
                        <TextArea
                            placeholder="Description"
                            id="description"
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                        />
                    </FormGroup> */}

                    {/* <FormGroup>
                        <Button intent={Intent.PRIMARY} text="Submit Proposal" onClick={this.submitClicked} />
                    </FormGroup> */}
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button intent={Intent.SUCCESS} onClick={this.submitProjectEdit} text="Save Changes" />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}