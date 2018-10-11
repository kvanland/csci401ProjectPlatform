import * as React from 'react';
import {
    Col,
    Input,
    Label,
} from 'reactstrap';
import autobind from 'autobind-decorator';
import { InputGroup, FormGroup, Card, TextArea, Button, Intent, HTMLSelect } from '@blueprintjs/core';
import { getApiURI } from '../../../common/server';

interface IProjectProps {
}

interface IProjectState {
    projectName: string;
    projectSemester: string;
    projectSize: number;
    technologies: string;
    background: string;
    description: string;
}

class ProposalForm extends React.Component<IProjectProps, IProjectState> {
    public state: IProjectState = {
        projectName: '',
        projectSemester: '',
        projectSize: 0,
        technologies: '',
        background: '',
        description: ''
    };

    @autobind
    async submitClicked() {
        try {
            const response = await fetch(getApiURI('/projects/save/' + sessionStorage.getItem('email')), {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Cache-Control': 'no-cache',
                },
                body: JSON.stringify({
                    projectName: this.state.projectName,
                    semester: this.state.projectSemester,
                    minSize: this.state.projectSize,
                    maxSize: this.state.projectSize,
                    technologies: this.state.technologies,
                    background: this.state.background,
                    description: this.state.description,
                }),
            });

            if (!response.ok) {
                throw Error(response.statusText);
            }

            alert('Proposal has been submitted succesfully!');

        } catch (e) {
            console.error(e);
        }
    }

    public handleChange = (id: keyof IProjectState) => (e: React.ChangeEvent<any>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    @autobind
    renderFormGroup(id: keyof IProjectState, type: string, label: string, placeholder: string) {
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
        return (
            <div className="csci-form-container">
                <div className="csci-form-actions">
                    <h1 style={{ margin: 0 }}>Create Proposal</h1>
                </div>
                <Card className="csci-form">
                    {this.renderFormGroup('projectName', 'text', 'Project Name', 'Project Name')}
                    <FormGroup label="Semester" labelFor="projectSemester">
                        <HTMLSelect
                            id="editUserType"
                            value={this.state.projectSemester}
                            onChange={this.handleChange('projectSemester')}
                        >
                            <option value="SUMMER18">Summer 2018</option>
                            <option value="FALL18">Fall 2018</option>
                            <option value="SPRING19">Spring 2019</option>
                        </HTMLSelect>
                    </FormGroup>
                    {this.renderFormGroup('projectSize', 'text', 'Number of Students', 'Number of Students')}
                    {this.renderFormGroup('technologies', 'text', 'Technologies Expected', 'Technologies Expected')}
                    {this.renderFormGroup('background', 'text', 'Background Requested', 'Background Requested')}
                    <FormGroup label="Description" labelFor="description">
                        <TextArea
                            placeholder="Description"
                            id="description"
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                        />
                    </FormGroup>

                </Card>
                <div className="csci-form-actions">
                    <Button intent={Intent.PRIMARY} text="Submit Proposal" onClick={this.submitClicked} large={true} />
                </div>
            </div>
        );

    }
}

export default ProposalForm;
