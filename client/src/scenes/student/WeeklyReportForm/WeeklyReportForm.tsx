import * as React from 'react';
import autobind from 'autobind-decorator';
import { InputType } from 'reactstrap/lib/Input';
import { Card, Button, Intent, FormGroup, InputGroup, HTMLTable, TextArea } from '@blueprintjs/core';
import { fetchServer } from 'common/server';
import { MainToast } from '../../../components/MainToast';

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
    public state: IWeeklyReportState = {
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

    @autobind
    async submitClicked() {

        const response = await fetchServer('/weeklyReportForm', 'POST', {
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

        if (response.ok) {
            alert('Weekly Report submission SUCCESSFUL!');
            MainToast.show({
                message: 'Weekly report submitted successfully!',
                intent: Intent.SUCCESS,
                icon: 'tick',
            });
        }

    }

    public handleChange = (id: keyof IWeeklyReportState) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    renderFormGroup = (id: keyof IWeeklyReportState, label: string, placeholder: string, formType: InputType = 'text') => {
        return (
            <FormGroup label={label} labelFor={id}>
                <InputGroup
                    type={formType}
                    id={id}
                    value={this.state[id]}
                    onChange={this.handleChange(id)}
                    placeholder={placeholder}
                />
            </FormGroup>
        );
    }

    renderLastWeekFragment = (id: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
        return (
            <tr>
                <td>{id}</td>
                <td>
                    <InputGroup
                        value={this.state[`lastWeekTasksH${id}`]}
                        onChange={this.handleChange(`lastWeekTasksH${id}` as any)}
                        placeholder="# hours"
                        style={{ width: 100 }}
                    />
                </td>
                <td>
                    <TextArea
                        value={this.state[`lastWeekTasksH${id}`]}
                        onChange={this.handleChange(`lastWeekTasksH${id}` as any)}
                        placeholder="Describe the task."
                        style={{ minWidth: 300, minHeight: 100 }}
                    />
                </td>
            </tr>
        );
    }

    renderNextWeekFragment = (id: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
        return (
            <tr>
                <td>{id}</td>
                <td>
                    <InputGroup
                        value={this.state[`nextWeekTasksH${id}`]}
                        onChange={this.handleChange(`nextWeekTasksH${id}` as any)}
                        placeholder="# hours"
                        style={{ width: 100 }}
                    />
                </td>
                <td>
                    <TextArea
                        value={this.state[`nextWeekTasksH${id}`]}
                        onChange={this.handleChange(`nextWeekTasksH${id}` as any)}
                        placeholder="Describe the task."
                        style={{ minWidth: 300, minHeight: 100 }}
                    />
                </td>
            </tr>
        );
    }

    render() {
        return (
            <div className="csci-form-container">
                <div className="csci-form-actions">
                    <h1 style={{ margin: 0 }}>Weekly Report</h1>
                </div>
                <Card className="csci-form">
                    {this.renderFormGroup('name', 'Student Name', 'Tommy Trojan')}
                    {this.renderFormGroup('uscusername', 'USC Username', 'ttrojan')}
                    {this.renderFormGroup('project', 'Project Name', 'Project Name')}
                    {this.renderFormGroup('reportdate', 'Report Date', 'MM/DD/YYYY')}
                </Card>
                <Card className="csci-form">

                    <h2 style={{ marginTop: 0 }}>Last Week</h2>

                    <HTMLTable bordered={true} striped={true}>
                        <thead>
                            <tr>
                                <td>Task#</td>
                                <td>Hours</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderLastWeekFragment(1)}
                            {this.renderLastWeekFragment(2)}
                            {this.renderLastWeekFragment(3)}
                            {this.renderLastWeekFragment(4)}
                            {this.renderLastWeekFragment(5)}
                            {this.renderLastWeekFragment(6)}
                            {this.renderLastWeekFragment(7)}
                        </tbody>
                    </HTMLTable>

                </Card>
                <Card className="csci-form">

                    <h2 style={{ marginTop: 0 }}>Next Week</h2>

                    <HTMLTable bordered={true} striped={true}>
                        <thead>
                            <tr>
                                <td>Task#</td>
                                <td>Hours</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>

                            {this.renderNextWeekFragment(1)}
                            {this.renderNextWeekFragment(2)}
                            {this.renderNextWeekFragment(3)}
                            {this.renderNextWeekFragment(4)}
                            {this.renderNextWeekFragment(5)}
                            {this.renderNextWeekFragment(6)}
                            {this.renderNextWeekFragment(7)}
                        </tbody>
                    </HTMLTable>
                </Card>
                <div className="csci-form-actions">
                    <Button text="Submit" onClick={this.submitClicked} intent={Intent.PRIMARY} large={true} />
                </div>
            </div>
        );
    }
}

export default WeeklyReportForm;
