import * as React from 'react';
import {
    Col,
    Input,
    Label,
} from 'reactstrap';
import autobind from 'autobind-decorator';
import { InputGroup, FormGroup, Card, TextArea, Button, Intent, HTMLSelect } from '@blueprintjs/core';
import { getApiURI, getUserEmail } from '../../../common/server';
import { fetchServer } from 'common/server';
import { MainToast } from 'components/MainToast';

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
    isSubmitting: boolean;
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
            projectYear: years[0],
            minSize: 0,
            maxSize: 0,
            technologies: '',
            background: '',
            description: '',
            studentNumber: numbers,
            listOfYears: years,
            isSubmitting: false,
        };
    }

    @autobind
    async submitClicked() {
        if (this.state.minSize > this.state.maxSize) {
            MainToast.show({
                message: 'Please select a maximum size greater or equal to the minimum size',
                intent: Intent.DANGER,
                icon: 'error',
            });
            return;
        }

        this.setState({ isSubmitting: true });

        const response = await fetchServer('/projects/save/' + getUserEmail(), 'POST', {
            projectName: this.state.projectName,
            semester: this.state.projectSemester,
            year: this.state.projectYear,
            minSize: this.state.minSize,
            maxSize: this.state.maxSize,
            technologies: this.state.technologies,
            background: this.state.background,
            description: this.state.description,
        });

        if (response.ok) {
            MainToast.show({
                message: 'Project proposal submitted successfull',
                intent: Intent.SUCCESS,
                icon: 'tick',
            });
        } else {
            MainToast.show({
                message: 'Could not process project proposal.',
                intent: Intent.DANGER,
                icon: 'error',
            });
        }

        this.setState({ isSubmitting: false });
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
                    <Button intent={Intent.PRIMARY} text="Submit Proposal" onClick={this.submitClicked} large={true} loading={this.state.isSubmitting} />
                </div>
            </div>
        );

    }
}

export default ProposalForm;
