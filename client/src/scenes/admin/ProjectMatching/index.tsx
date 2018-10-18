import * as React from 'react';
import ProjectsList from './ProjectsList';
import { getApiURI } from '../../../common/server';
import { InputGroup, Button, Intent, NonIdealState, Tabs } from '@blueprintjs/core';
import { Loading } from '../../../components/Loading';
import autobind from 'autobind-decorator';
import { IProject } from 'common/interfaces';
import { MdLaunch } from 'react-icons/md';
import { fetchServer } from 'common/server';

interface IProjectMatchingProps {
}

interface IProjectMatchingState {
  projects: Array<IProject>;
  isLoading: boolean;
  isLaunched: boolean;
}

class ProjectMatching extends React.Component<IProjectMatchingProps, IProjectMatchingState> {

  constructor(props: IProjectMatchingProps) {
    super(props);

    this.state = {
      projects: [],
      isLoading: false,
      isLaunched: false
    };
    this.launch = this.launch.bind(this);
    this.buttonTitle = this.buttonTitle.bind(this);
    this.assignProjects = this.assignProjects.bind(this);
    this.saveProjects = this.saveProjects.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: false });

    try {
      const response = await fetchServer('/projects/getassignment');
      const data = await response.json();
      console.log(data);
      this.setState({
        projects: data
      });
      if (data.length > 0) {
        this.setState({ isLaunched: true });
      }
    } catch (e) {
      console.error(e);
    }

  }

  async launch() {
    this.setState({ isLaunched: true });
    try {
      const response = await fetchServer('/projects/assignment');
      const data = await response.json();

      this.setState({
        projects: data
      });
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
    const response = await fetchServer('/projects/assign-to-students', 'POST', this.state.projects);
    if (response.ok) {
      alert('Projects assignments were successfully emailed to students.');
    } else {
      alert('Could not assign projects.');
    }
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
              <Tabs.Expander />
              <Button
                onClick={this.assignProjects}
                intent={Intent.SUCCESS}
                disabled={projects.length === 0}
                text="Assign Projects"
                large={true}
              />
              <Button
                onClick={this.saveProjects}
                intent={Intent.SUCCESS}
                disabled={projects.length === 0}
                text="Save Assignments"
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