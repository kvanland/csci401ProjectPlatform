import * as React from 'react';
import ProjectsList from './ProjectsList';
import {
  Table,
  Button,
  FormGroup,
  FormControl,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

interface ProjectMatchingProps {
}

interface ProjectMatchingState {
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

class ProjectMatching extends React.Component<ProjectMatchingProps, ProjectMatchingState> {

  constructor(props: ProjectMatchingProps) {
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
    this.setState({isLoading: false});
  }

  launch = () => {
    this.setState({isLaunched: true});
    fetch('http://localhost:8080/projects/assignment')
      .then(response => response.json())
      .then(data => this.setState({projects: data}));
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

  render() {
    const isLoading = this.state.isLoading;
    const isLaunched = this.state.isLaunched;
    const projects = this.state.projects;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const header = (
      <div style={{margin: 'auto', float: 'none', width: 1000}}>
        <h2>Project Matching</h2>
        <form>
          <Grid>
            <Row>
                <Col lg={8}>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Enter number of ranked projects to consider"
                  />
                  <FormControl.Feedback />
                  <Button type="submit" onClick={this.launch} style={{margin: 5}}>
                    {this.buttonTitle()}
                  </Button>
                </FormGroup>
                </Col>
                <Col lg={4}>
                  <Button onClick={this.assignProjects} bsStyle="primary" disabled={projects.length === 0}>
                      Assign Projects
                  </Button>
                </Col>
            </Row>
          </Grid>
        </form>
      </div>
    );

    if (!isLaunched) {
      return header;
    }

    if (isLaunched && !projects.length) {
      return (
        <div style={{margin: 'auto', float: 'none', width: 1000}}>
          {header}
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div>
      {header}

      <ProjectsList projects={this.state.projects} />

      </div>
    );
  }
}

export default ProjectMatching;