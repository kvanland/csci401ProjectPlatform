import * as React from 'react';
import ProjectsList from './ProjectsList';
import { getApiURI } from '../../../common/server';
import { InputGroup, Button, Intent, NonIdealState, Tabs } from '@blueprintjs/core';
import { Loading } from '../../../components/Loading';
import autobind from 'autobind-decorator';
import { IProject } from 'common/interfaces';
import { MdLaunch } from 'react-icons/md';

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
      const response = await fetch(getApiURI('/projects/getassignment'));
      const data = await response.json();

      this.setState({
        projects: data
      });
      if (data.length > 0) {
        this.setState({ isLaunched: true });
      }
      console.log(data);
    } catch (e) {
      console.error(e);
    }

  }

  async launch() {
    this.setState({ isLaunched: true });
    try {
      const response = await fetch(getApiURI('/projects/assignment'));
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

  assignProjects() {
    var request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open('POST', 'http://localhost:8080/projects/assign-to-students');
    var data = JSON.stringify(
      this.state.projects
    );
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.setRequestHeader('Cache-Control', 'no-cache');
    request.send(data);
    alert('Projects Assigned');
  }

  saveProjects() {
    var request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open('POST', 'http://localhost:8080/projects/save-assignments');
    var data = JSON.stringify(
      this.state.projects
    );
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.setRequestHeader('Cache-Control', 'no-cache');
    request.send(data);
    alert('Assignments Saved');
  }

  @autobind
  handleKeyDownProjectRanker(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      this.launch();
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
        {/* <div className="csci-side">
          <Card>
            <FormGroup>
              <InputGroup
                type="text"
                placeholder="Enter number of ranked projects to consider"
                rightElement={(
                  <Button
                    minimal={true}
                    rightIcon="arrow-right"
                    intent={Intent.PRIMARY}
                    onClick={this.launch}
                    text="Generate"
                  />
                )}
                onKeyDown={this.handleKeyDownProjectRanker}
              />
            </FormGroup>
            <Button onClick={this.assignProjects} intent={Intent.SUCCESS} disabled={projects.length === 0} text="Assign Projects" />
          </Card>
        </div> */}
        <div className="csci-main">
          <div style={{ margin: 20 }}>
            <Tabs id="project-match-tabs">
              <InputGroup
                type="text"
                placeholder="Enter number of ranked projects to consider"
                rightElement={(
                  <Button
                    minimal={true}
                    rightIcon="arrow-right"
                    intent={Intent.PRIMARY}
                    onClick={this.launch}
                    text="Generate"
                  />
                )}
                large={true}
                onKeyDown={this.handleKeyDownProjectRanker}
              />
              <Tabs.Expander />
              <Button onClick={this.assignProjects} intent={Intent.SUCCESS} disabled={projects.length === 0} text="Assign Projects" large={true} />
              <Button onClick={this.saveProjects} intent={Intent.SUCCESS} disabled={projects.length === 0}    text="Save Assignments" large={true}/>
            </Tabs>
          </div>
          {isLaunched ? (
            <div>
              {projects.length > 0 ? (
                <ProjectsList projects={this.state.projects} />
              ) : (
                  <Loading />
                )
              }
            </div>
          ) : (
              <NonIdealState
                icon="search-around"
                title="Match Students With Projects"
                description="Enter number of ranked projects to consider on the left side panel."
              />
            )}
        </div>

      </div>
    );
  }
}

export default ProjectMatching;