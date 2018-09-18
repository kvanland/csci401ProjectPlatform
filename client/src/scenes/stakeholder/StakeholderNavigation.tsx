import * as React from 'react';
import {
  Route,
  BrowserRouter,
  RouteComponentProps,
  withRouter
} from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  Button
} from 'reactstrap';
import {
  LinkContainer
} from 'react-router-bootstrap';
import Home from './Home/index';
import Profile from './Profile/index';
import ProjectProposal from './ProjectProposal/index';
import ProjectPage from './ProjectPage/index';
import autobind from 'autobind-decorator';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
const logo = require('../../svg/logo.svg');

interface IStakeholderProps extends RouteComponentProps<any> {
}
interface IStakeholderState {
  currentProject: number;
}

class StakeholderNavigation extends React.Component<IStakeholderProps, IStakeholderState> {
  constructor(props: IStakeholderProps) {
    super(props);
  }
  componentDidMount() {
    this.state = {
      currentProject: 0
    };
  }

  @autobind
  logOutClicked() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userType');
    this.props.history.push('/');
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar>
            <NavbarBrand>
              <img src={logo} className="App-logo" alt="logo" />
            </NavbarBrand>

            <NavbarBrand>
              <LinkContainer to="/stakeholder">
                <a>CSCI 401</a>
              </LinkContainer>
            </NavbarBrand>
            <Nav>
              <LinkContainer to="/stakeholder/profile">
                <NavItem eventKey={1}>
                  Profile
                </NavItem>
              </LinkContainer>

              <LinkContainer to="/stakeholder/proposals">
                <NavItem eventKey={2}>
                  Project Proposal
                </NavItem>
              </LinkContainer>

              <NavItem eventKey={6}>
                <FormGroup>
                  <Button type="submit" onClick={this.logOutClicked}>Log Out</Button>
                </FormGroup>
              </NavItem>
            </Nav>
          </Navbar>
          <div className="content">
            <Route exact={true} path="/stakeholder" component={Home} />
            <Route path="/stakeholder/profile" component={Profile} />
            <Route path="/stakeholder/proposals" component={ProjectProposal} />
            <Route path="/stakeholder/project/:projectId" handler={ProjectPage} component={ProjectPage} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default withRouter(StakeholderNavigation);