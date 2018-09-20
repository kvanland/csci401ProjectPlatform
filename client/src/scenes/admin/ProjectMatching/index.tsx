import * as React from 'react';
import ProjectsList from './ProjectsList';
import { getApiURI } from '../../../common/server';
import { FormGroup, InputGroup, Button, Intent, Card } from '@blueprintjs/core';
import { Loading } from '../../../components/Loading';
import autobind from 'autobind-decorator';

interface IProjectMatchingProps {
}

interface IProjectMatchingState {
  projects: Array<Project>;
  isLoading: boolean;
  isLaunched: boolean;
}

export type StudentInfo = {
  userId: number;
  firstName: string;
  lastName: string;
  rankings: Array<{}>;
  orderedRankings: Array<{}>;
};

export type Project = {
  projectId: number;
  projectName: string;
  minSize: number;
  maxSize: number;
  members: Array<StudentInfo>;
};

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
  }

  componentDidMount() {
    this.setState({ isLoading: false });
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
        <div className="csci-main">
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
          {isLaunched && (
            <Card>
              {projects.length > 0 ? (
                <ProjectsList projects={this.state.projects} />
              ) : <p>Loading...</p>
              }
            </Card>
          )}
        </div>

      </div>
    );
  }
}

export default ProjectMatching;