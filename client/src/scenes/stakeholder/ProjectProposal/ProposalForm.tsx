import * as React from 'react';
import {
    Col,
    Input,
    Label,
} from 'reactstrap';
import autobind from 'autobind-decorator';
import { InputGroup, FormGroup, Card, TextArea } from '@blueprintjs/core';

interface IProjectProps {
}

interface IProjectState {
    projectName: string;
    projectSize: number;
    technologies: string;
    background: string;
    description: string;
}

class ProposalForm extends React.Component<IProjectProps, IProjectState> {
    public state: IProjectState = {
        projectName: '',
        projectSize: 0,
        technologies: '',
        background: '',
        description: ''
    };

    @autobind
    submitClicked() {
        var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('POST', 'http://localhost:8080/projects/save/' + sessionStorage.getItem('email'));
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var data = JSON.stringify({
            projectName: this.state.projectName,
            minSize: this.state.projectSize,
            maxSize: this.state.projectSize,
            technologies: this.state.technologies,
            background: this.state.background,
            description: this.state.description,
        });
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.send(data);
        alert('Your project proposal has been submitted!');
        /*
        fetch('http://localhost:8080/projectData/', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        projectName: this.state.projectName,
        projectSize: this.state.projectSize,
        technologiesExpected: this.state.technologiesExpected,
        backgroundRequested: this.state.backgroundRequested,
        projectDescription: this.state.projectDescription,
        })
        });
        */
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
            <Card>
                {this.renderFormGroup('projectName', 'text', 'Project Name', 'Project Name')}
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
        );

    }
}

export default ProposalForm;
