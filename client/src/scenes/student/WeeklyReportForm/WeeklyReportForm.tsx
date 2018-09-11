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

interface IWeeklyReportProps {
}

interface IWeeklyReportState {
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
class WeeklyReportForm extends React.Component<IWeeklyReportProps, IWeeklyReportState> {
    constructor(props: IWeeklyReportProps) {
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
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                alert('Weekly Report submission SUCCESSFUL!');
            }
        };

    }

    public handleChange = (id: keyof IWeeklyReportState) => (e: React.FormEvent<FormControlProps>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    renderFormGroup = (id: keyof IWeeklyReportState, label: string, placeholder: string, controlId: string, formType: string = 'text', componentClass?: string) => {
        return (
            <FormGroup controlId={controlId}>
                <Col componentClass={ControlLabel} sm={2}>
                    <b>{label}</b>
                </Col>
                <Col sm={10}>
                    <FormControl
                        componentClass={componentClass}
                        type={formType}
                        id={id}
                        value={this.state[id]}
                        onChange={this.handleChange(id)}
                        placeholder={placeholder}
                    />
                </Col>
            </FormGroup>
        );
    }

    renderLastWeekFragment = (id: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
        return (
            <React.Fragment>
                {this.renderFormGroup(`lastWeekTasksH${id}` as any, `Last Week Task ${id} Hours`, '# hours', `formHorizontalLWH${id}`)}
                {this.renderFormGroup(`lastWeekTasksD${id}` as any, `Task ${id} Description`, 'Describe the task.', `formHorizontalLWD${id}`)}
            </React.Fragment>
        );
    }

    renderNextWeekFragment = (id: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
        return (
            <React.Fragment>
                {this.renderFormGroup(`nextWeekTasksH${id}` as any, `Next Week Task ${id} Hours`, '# hours', `formHorizontalNWH${id}`)}
                {this.renderFormGroup(`nextWeekTasksD${id}` as any, `Task ${id} Description`, 'Describe the task.', `formHorizontalNWD${id}`)}
            </React.Fragment>
        );
    }

    render() {
        return (
            <Form horizontal={true} >
                {this.renderFormGroup('name', 'Student Name', 'Tommy Trojan', 'formHorizontalStudentName')}
                {this.renderFormGroup('uscusername', 'USC Username', 'ttrojan', 'formHorizontalUsername')}
                {this.renderFormGroup('project', 'Project Name', 'Project Name', 'formHorizontalProject')}
                {this.renderFormGroup('reportdate', 'Report Date', 'MM/DD/YYYY', 'formHorizontalDate')}

                {this.renderLastWeekFragment(1)}
                {this.renderLastWeekFragment(2)}
                {this.renderLastWeekFragment(3)}
                {this.renderLastWeekFragment(4)}
                {this.renderLastWeekFragment(5)}
                {this.renderLastWeekFragment(6)}
                {this.renderLastWeekFragment(7)}

                {this.renderNextWeekFragment(1)}
                {this.renderNextWeekFragment(2)}
                {this.renderNextWeekFragment(3)}
                {this.renderNextWeekFragment(4)}
                {this.renderNextWeekFragment(5)}
                {this.renderNextWeekFragment(6)}
                {this.renderNextWeekFragment(7)}

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
