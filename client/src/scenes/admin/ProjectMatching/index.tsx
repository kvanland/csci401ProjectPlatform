import * as React from 'react';
import ProjectsList from './ProjectsList';
import { getApiURI } from '../../../common/server';
import { InputGroup, Button, Intent, NonIdealState, Tabs, HTMLSelect, FormGroup, Toast, Toaster, Position } from '@blueprintjs/core';
import { Loading } from '../../../components/Loading';
import autobind from 'autobind-decorator';
import { IProject } from 'common/interfaces';
import { fetchServer } from 'common/server';
import { MainToast } from '../../../components/MainToast';

interface IProjectMatchingProps {
}

interface IProjectMatchingState {
  projects: Array<IProject>;
  isLoading: boolean;
  isLaunched: boolean;
  isSendingEmails: boolean;
  editYear: string;
  editSemester: string;
  listOfYears: string[];
}

@autobind
class ProjectMatching extends React.Component<IProjectMatchingProps, IProjectMatchingState> {

  constructor(props: IProjectMatchingProps) {
    super(props);

    const years: string[] = [];
    const currYear = (new Date()).getFullYear();

    for (var i = 0; i < 5; i++) {
      years.push((currYear - 2 + i).toString());
    }

    this.state = {
      projects: [],
      isLoading: false,
      isLaunched: false,
      isSendingEmails: false,
      editYear: years[0],
      editSemester: 'FALL',
      listOfYears: years,
    };
  }

  componentDidMount() {
    this.fetchAssignments();
  }

  async componentDidUpdate(oldProps: IProjectMatchingProps, oldState: IProjectMatchingState) {
    if (oldState.editSemester !== this.state.editSemester || oldState.editYear !== this.state.editYear) {
      this.fetchAssignments();
    }
  }

  async fetchAssignments() {
    this.setState({ isLoading: true });
    try {
      const response = await fetchServer(`/projects/getassignment?semester=${this.state.editSemester}&year=${this.state.editYear}`);
      const data = await response.json();
      console.log(data);
      this.setState({
        projects: data,
        isLoading: false,
      });
      if (data.length > 0) {
        this.setState({ isLaunched: true });
      } else {
        this.setState({ isLoading: false });
        this.setState({ isLaunched: false });
      }
    } catch (e) {
      console.error(e);
    }
  }

  handleChange = (id: keyof IProjectMatchingState) => (e: React.FormEvent<any>) => {
    this.setState({
      [id]: e.currentTarget.value,
    } as any);
  }

  async launch() {
    this.setState({ isLaunched: true });
    try {
      const response = await fetchServer(`/projects/assignment?semester=${this.state.editSemester}&year=${this.state.editYear}`);
      const data = await response.json();
      if (data.length === 0) {
        MainToast.show({
          intent: Intent.DANGER,
          icon: 'tick',
          message: 'No possible assignments.',
        });
        this.setState({
          isLaunched: false,
          isLoading: false
        });
      } else {
        this.setState({
          projects: data
        });
      }

    } catch (e) {
      console.error(e);
    }

  }

  buttonTitle() {
    if (this.state.isLaunched) {
      return 'Clear Matchings';
    }
    return 'Let the games begin.';
  }

  async assignProjects() {
    await this.setState({ isSendingEmails: true });
    const response = await fetchServer('/projects/assign-to-students', 'POST', this.state.projects);
    if (response.ok) {
      alert('Projects assignments were successfully emailed to students.');
    } else {
      alert('Could not assign projects.');
    }
    await this.setState({ isSendingEmails: false });
  }

  async saveProjects() {
    const response = await fetchServer('/projects/save-assignments', 'POST', this.state.projects);
    if (response.ok) {
      alert('Projects assignments were successfully saved to server.');
    } else {
      alert('Could not save project assignments.');
    }
  }

  render() {
    const isLoading = this.state.isLoading;
    const isLaunched = this.state.isLaunched;
    const projects = this.state.projects;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className="csci-container">
        <div className="csci-main" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ margin: 20 }}>
            <Tabs id="project-match-tabs">
              <Button
                rightIcon="arrow-right"
                intent={Intent.PRIMARY}
                onClick={this.launch}
                text="Generate Matches"
                large={true}
              />
              <FormGroup label="Semester" labelFor="editSemester">
                <HTMLSelect
                  id="editSemester"
                  value={this.state.editSemester}
                  onChange={this.handleChange('editSemester')}
                >
                  <option value="SUMMER">SUMMER</option>
                  <option value="FALL">FALL</option>
                  <option value="SPRING">SPRING</option>
                </HTMLSelect>

                <HTMLSelect
                  id="editYear"
                  value={this.state.editYear}
                  onChange={this.handleChange('editYear')}
                >
                  {this.state.listOfYears.map((year: string) => (
                    <option value={year} key={year}>{year}</option>
                  ))}
                </HTMLSelect>
              </FormGroup>
              <Tabs.Expander />
              <Button
                onClick={this.assignProjects}
                intent={Intent.NONE}
                disabled={projects.length === 0}
                text="Assign Projects"
                icon="envelope"
                large={true}
                loading={this.state.isSendingEmails}
              />
              <Button
                onClick={this.saveProjects}
                intent={Intent.SUCCESS}
                disabled={projects.length === 0}
                text="Save Assignments"
                icon="floppy-disk"
                large={true}
              />
            </Tabs>
          </div>
          <div style={{ flex: 1 }}>
            {isLaunched && (projects.length > 0 ? (
              <div style={{ marginTop: -20 }}>
                <ProjectsList projects={this.state.projects} />
              </div>
            ) : <Loading />)}
            {!isLaunched && (
              <NonIdealState
                icon="search-around"
                title="Match Students With Projects"
                description="Click 'Generate Matches' to match students to their preferred projects."
              />
            )}
          </div>
        </div>

      </div>
    );
  }
}

export default ProjectMatching;