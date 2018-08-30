import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    FormControl,
    Button,
    ControlLabel
} from 'react-bootstrap';

interface ProjectProps {
}
interface ProjectState {
projectName: string;
projectSize: number;
technologies: string;
background: string;
description: string;
}

class ProposalForm extends React.Component<ProjectProps, ProjectState> {
constructor(props: ProjectProps) {
    super(props);
    this.state = {
    projectName: '',
    projectSize: 0,
    technologies: '',
    background: '',
    description: ''
    };
    this.submitClicked = this.submitClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);

}
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
    handleChange(e: any) {
    this.setState({ [e.target.id]: e.target.value });

    }

    render() {
        return (
        <Form horizontal={true} >
            <FormGroup controlId="formHorizontalProjectName">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Project Name</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="projectName"
                    value={this.state.projectName}
                    onChange={e => this.handleChange(e)}
                    placeholder="Project Name"
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalNumberStudents">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Number of Students</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="projectSize"
                    placeholder="Number of Students"
                    onChange={e => this.handleChange(e)}
                    value={this.state.projectSize}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalTechnologies">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Technologies Expected</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="technologies"
                    value={this.state.technologies}
                    placeholder="Technologies expected"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalBackground">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Background Requested</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="background"
                    value={this.state.background}
                    placeholder="Background requested"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalDescription">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    componentClass="textarea"
                    type="text"
                    id="description"
                    value={this.state.description}
                    placeholder="Description"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                <Button type="submit" onClick={this.submitClicked}>Submit</Button>
                </Col>
            </FormGroup>
        </Form>
        );

    }
}

export default ProposalForm;
