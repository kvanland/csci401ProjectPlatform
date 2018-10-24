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
    projectYear: string;
    minSize: number;
    maxSize: number;
    technologies: string;
    background: string;
    description: string;
    studentNumber: number[];
    listOfYears: string[];
}

class ProposalForm extends React.Component<IProjectProps, IProjectState> {
    constructor(props: IProjectState) {
        super(props);

        const numbers: number[] = [];

        for (var i = 0; i < 21; i++) {
            numbers.push(i);
        }

        const years: string[] = [];
        const currYear = (new Date()).getFullYear();
    
        for (var j = 0; j < 5; j++) {
          years.push((currYear - 2 + j).toString());
        }

        this.state = {
            projectName: '',
            projectSemester: 'SUMMER',
            projectYear: '',
            minSize: 0,
            maxSize: 0,
            technologies: '',
            background: '',
            description: '',
            studentNumber: numbers,
            listOfYears: years,
        };
    }

    @autobind
    async submitClicked() {
        if (this.state.minSize > this.state.maxSize) {
            alert('Please select a maximum size greater or equal to the minimum size');
            throw Error;
        } 

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
                    year: this.state.projectYear,
                    minSize: this.state.minSize,
                    maxSize: this.state.maxSize,
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
                    
                    <FormGroup label="Minimum Size" labelFor="minSize">
                        <HTMLSelect
                            id="editMinSize"
                            value={this.state.minSize}
                            onChange={this.handleChange('minSize')}
                            options={this.state.studentNumber}
                        />
                    </FormGroup>

                    <FormGroup label="Maximum size" labelFor="maxSize">
                        <HTMLSelect
                            id="editMaxSize"
                            value={this.state.maxSize}
                            onChange={this.handleChange('maxSize')}
                            options={this.state.studentNumber}
                        />
                    </FormGroup>
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

                     <FormGroup label="Semester">
                     <table>
                            <tr>
                                <td>
                                    <HTMLSelect
                                        id="editSemester"
                                        value={this.state.projectSemester}
                                        onChange={this.handleChange('projectSemester')}
                                    >
                                        <option value="SUMMER">SUMMER</option>
                                        <option value="FALL">FALL</option>
                                        <option value="SPRING">SPRING</option>
                                    </HTMLSelect>
                                </td>
                                <td>
                                    <HTMLSelect
                                        id="editYear"
                                        value={this.state.projectYear}
                                        onChange={this.handleChange('projectYear')}
                                        options={this.state.listOfYears}
                                    />
                                </td>
                            </tr>
                        </table>
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
