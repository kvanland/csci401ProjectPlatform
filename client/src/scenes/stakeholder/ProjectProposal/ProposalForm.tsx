import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    FormControl,
    Button,
    ControlLabel,
    FormControlProps
} from 'react-bootstrap';
import autobind from 'autobind-decorator';

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

    public handleChange = (id: keyof IProjectState) => (e: React.FormEvent<FormControlProps>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    renderFormGroup = (id: keyof IProjectState, label: string, placeholder: string, componentClass?: string) => {
        return (
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    <b>{label}</b>
                </Col>
                <Col sm={10}>
                    <FormControl
                        componentClass={componentClass}
                        type="text"
                        id={id}
                        value={this.state[id]}
                        onChange={this.handleChange(id)}
                        placeholder={placeholder}
                    />
                </Col>
            </FormGroup>
        );
    }

    render() {
        return (
            <Form horizontal={true} >
                {this.renderFormGroup('projectName', 'Project Name', 'Project Name')}
                {this.renderFormGroup('projectSize', 'Number of Students', 'Number of Students')}
                {this.renderFormGroup('technologies', 'Technologies Expected', 'Technologies Expected')}
                {this.renderFormGroup('background', 'Background Requested', 'Background Requested')}
                {this.renderFormGroup('description', 'Description', 'Description', 'textarea')}
                <Button bsStyle="success" onClick={this.submitClicked}>Submit</Button>
            </Form>
        );

    }
}

export default ProposalForm;
