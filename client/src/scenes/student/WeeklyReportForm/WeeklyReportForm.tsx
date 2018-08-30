import * as React from 'react';
import {
    Form,
    FormGroup,
    Col,
    FormControl,
    Button,
    ControlLabel
} from 'react-bootstrap';

interface WeeklyReportProps {
}

interface WeeklyReportState {
name: string;
uscusername: string;
project: string;
reportdate: string;
lastWeekTasksH1: string;
lastWeekTasksH2: string;
lastWeekTasksH3: string;
lastWeekTasksH4: string;
lastWeekTasksH5: string;
lastWeekTasksH6: string;
lastWeekTasksH7: string;

lastWeekTasksD1: string;
lastWeekTasksD2: string;
lastWeekTasksD3: string;
lastWeekTasksD4: string;
lastWeekTasksD5: string;
lastWeekTasksD6: string;
lastWeekTasksD7: string;

nextWeekTasksH1: string;
nextWeekTasksH2: string;
nextWeekTasksH3: string;
nextWeekTasksH4: string;
nextWeekTasksH5: string;
nextWeekTasksH6: string;
nextWeekTasksH7: string;

nextWeekTasksD1: string;
nextWeekTasksD2: string;
nextWeekTasksD3: string;
nextWeekTasksD4: string;
nextWeekTasksD5: string;
nextWeekTasksD6: string;
nextWeekTasksD7: string;

}
class WeeklyReportForm extends React.Component<WeeklyReportProps, WeeklyReportState> {
constructor(props: WeeklyReportProps) {
super(props);
this.state = {
name: '',
uscusername: '',
project: '',
reportdate: '',
lastWeekTasksH1: '',
lastWeekTasksH2: '',
lastWeekTasksH3: '',
lastWeekTasksH4: '',
lastWeekTasksH5: '',
lastWeekTasksH6: '',
lastWeekTasksH7: '',

lastWeekTasksD1: '',
lastWeekTasksD2: '',
lastWeekTasksD3: '',
lastWeekTasksD4: '',
lastWeekTasksD5: '',
lastWeekTasksD6: '',
lastWeekTasksD7: '',

nextWeekTasksH1: '',
nextWeekTasksH2: '',
nextWeekTasksH3: '',
nextWeekTasksH4: '',
nextWeekTasksH5: '',
nextWeekTasksH6: '',
nextWeekTasksH7: '',

nextWeekTasksD1: '',
nextWeekTasksD2: '',
nextWeekTasksD3: '',
nextWeekTasksD4: '',
nextWeekTasksD5: '',
nextWeekTasksD6: '',
nextWeekTasksD7: ''
};
this.submitClicked = this.submitClicked.bind(this);
this.handleChange = this.handleChange.bind(this);
}
submitClicked() {

var request = new XMLHttpRequest();
request.withCredentials = true;
request.open('POST', 'http://localhost:8080/weeklyReportForm/');
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
var data = JSON.stringify({
name: this.state.name,
uscusername: this.state.uscusername,
project: this.state.project,
reportdate: this.state.reportdate,
lastWeekTasksH1: this.state.lastWeekTasksH1,
lastWeekTasksH2: this.state.lastWeekTasksH2,
lastWeekTasksH3: this.state.lastWeekTasksH3,
lastWeekTasksH4: this.state.lastWeekTasksH4,
lastWeekTasksH5: this.state.lastWeekTasksH5,
lastWeekTasksH6: this.state.lastWeekTasksH6,
lastWeekTasksH7: this.state.lastWeekTasksH7,
lastWeekTasksD1: this.state.lastWeekTasksD1,
lastWeekTasksD2: this.state.lastWeekTasksD2,
lastWeekTasksD3: this.state.lastWeekTasksD3,
lastWeekTasksD4: this.state.lastWeekTasksD4,
lastWeekTasksD5: this.state.lastWeekTasksD5,
lastWeekTasksD6: this.state.lastWeekTasksD6,
lastWeekTasksD7: this.state.lastWeekTasksD7,
nextWeekTasksH1: this.state.nextWeekTasksH1,
nextWeekTasksH2: this.state.nextWeekTasksH2,
nextWeekTasksH3: this.state.nextWeekTasksH3,
nextWeekTasksH4: this.state.nextWeekTasksH4,
nextWeekTasksH5: this.state.nextWeekTasksH5,
nextWeekTasksH6: this.state.nextWeekTasksH6,
nextWeekTasksH7: this.state.nextWeekTasksH7,
nextWeekTasksD1: this.state.nextWeekTasksD1,
nextWeekTasksD2: this.state.nextWeekTasksD2,
nextWeekTasksD3: this.state.nextWeekTasksD3,
nextWeekTasksD4: this.state.nextWeekTasksD4,
nextWeekTasksD5: this.state.nextWeekTasksD5,
nextWeekTasksD6: this.state.nextWeekTasksD6,
nextWeekTasksD7: this.state.nextWeekTasksD7
});
request.setRequestHeader('Cache-Control', 'no-cache');
request.send(data);
alert(request.responseText + 'Your request has been submitted!');
request.onreadystatechange = function() {
if (request.readyState === 4) {
    alert('Weekly Report submission SUCCESSFUL!');
}
};

}

handleChange(e: any) {
this.setState({ [e.target.id]: e.target.value });
}

render() {
        return (
            <Form horizontal={true} >
            <FormGroup controlId="formHorizontalStudentName">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Student Name</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="name"
                    onChange={e => this.handleChange(e)}
                    value={this.state.name}
                    placeholder="Student Name"
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalUsername">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>USC Username</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="uscusername"
                    onChange={e => this.handleChange(e)}
                    value={this.state.uscusername}
                    placeholder="ttrojan"
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalProject">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Project Name</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="project"
                    onChange={e => this.handleChange(e)}
                    value={this.state.project}
                    placeholder="Project name"
                />
                </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalDate">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Report Date</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="reportdate"
                    value={this.state.reportdate}
                    placeholder="MM/DD/YYYY"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalLastWeekTasksH1">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Last Week Task 1 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksH1"
                    onChange={e => this.handleChange(e)}
                    placeholder="5"
                    value={this.state.lastWeekTasksH1}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalLWD1">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 1 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksD1"
                    value={this.state.lastWeekTasksD1}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
             <FormGroup controlId="formHorizontalLWH2">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Last Week Task 2 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksH2"
                    value={this.state.lastWeekTasksH2}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalLWD2">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 2 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksD2"
                    value={this.state.lastWeekTasksD2}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalLWH3">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Last Week Task 3 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksH3"
                    value={this.state.lastWeekTasksH3}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalLWD3">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 3 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksD3"
                    value={this.state.lastWeekTasksD3}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalLWH4">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Last Week Task 4 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksH4"
                    value={this.state.lastWeekTasksH4}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalLWD4">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 4 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksD4"
                    value={this.state.lastWeekTasksD4}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
             <FormGroup controlId="formHorizontalLWH5">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Last Week Task 4 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksH5"
                    value={this.state.lastWeekTasksH5}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalLWD5">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 5 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksD5"
                    value={this.state.lastWeekTasksD5}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
             <FormGroup controlId="formHorizontalLWH6">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Last Week Task 6 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksH6"
                    value={this.state.lastWeekTasksH6}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalLWD6">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 6 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksD6"
                    value={this.state.lastWeekTasksD6}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalLWH7">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Last Week Task 7 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksH7"
                    value={this.state.lastWeekTasksH7}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalLWD7">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 7 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="lastWeekTasksD7"
                    value={this.state.lastWeekTasksD7}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWH1">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Next Week Task 1 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksH1"
                    value={this.state.nextWeekTasksH1}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWD1">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 1 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksD1"
                    value={this.state.nextWeekTasksD1}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWH2">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Next Week Task 2 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksH2"
                    value={this.state.nextWeekTasksH2}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWD2">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 2 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksD2"
                    value={this.state.nextWeekTasksD2}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWH3">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Next Week Task 3 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksH3"
                    value={this.state.nextWeekTasksH3}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWD3">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 3 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksD3"
                    value={this.state.nextWeekTasksD3}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWH4">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Next Week Task 4 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksH4"
                    value={this.state.nextWeekTasksH4}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWD4">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 4 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksD4"
                    value={this.state.nextWeekTasksD4}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWH5">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Next Week Task 5 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksH5"
                    value={this.state.nextWeekTasksH5}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWD5">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 5 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksD5"
                    value={this.state.nextWeekTasksD5}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
             <FormGroup controlId="formHorizontalNWH6">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Next Week Task 6 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksH6"
                    value={this.state.nextWeekTasksH6}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWD6">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 6 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksD6"
                    value={this.state.nextWeekTasksD6}
                    placeholder="Describe the task."
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
             <FormGroup controlId="formHorizontalNWH7">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Next Week Task 7 Hours</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksH7"
                    value={this.state.nextWeekTasksH7}
                    placeholder="4"
                    onChange={e => this.handleChange(e)}
                />
                </Col>
            </FormGroup>
            
            <FormGroup controlId="formHorizontalNWD7">
                <Col componentClass={ControlLabel} sm={2}>
                    <b>Task 7 Description</b>
                </Col>
                <Col sm={10}>
                <FormControl
                    type="text"
                    id="nextWeekTasksD7"
                    value={this.state.nextWeekTasksD7}
                    placeholder="Describe the task"
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

export default WeeklyReportForm;
