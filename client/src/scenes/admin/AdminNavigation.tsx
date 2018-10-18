
import * as React from 'react';
import {
  Route,
} from 'react-router-dom';
import {
  Navbar,
  Button,
  Alignment,
  Tabs,
  Tab,
  TabId,
} from '@blueprintjs/core';
import UserManagement from './UserManagement';
import ProjectProposals from './ProjectProposals';
import ClassOverview from './ClassOverview/ClassOverview';
import ProjectMatching from './ProjectMatching';
import {
  RouteComponentProps,
  withRouter,
  Redirect
} from 'react-router';
import autobind from 'autobind-decorator';
const logo = require('../../svg/logo.svg');

interface IAdminNavigationProps extends RouteComponentProps<any> {
}

interface IAdminNavigationState {
  navbarTabId: TabId;
}

class AdminNavigation extends React.Component<IAdminNavigationProps, IAdminNavigationState> {

  state: IAdminNavigationState = {
    navbarTabId: 'home',
  };

  componentDidMount() {
    const navbarTabId = this.inferNavbarTabId();
    this.setState({ navbarTabId });
  }

  componentDidUpdate(oldProps: IAdminNavigationProps) {
    if (oldProps.location.pathname !== this.props.location.pathname) {
      const navbarTabId = this.inferNavbarTabId();
      this.setState({ navbarTabId });
    }
  }

  @autobind
  inferNavbarTabId() {
    const mappings = [
      {
        pathname: '/admin/users',
        navbarTabId: 'users',
      },
      {
        pathname: '/admin/proposals',
        navbarTabId: 'proposals',
      },
      {
        pathname: '/admin/class',
        navbarTabId: 'class',
      },
      {
        pathname: '/admin/matching',
        navbarTabId: 'matching',
      }
    ];

    for (const mapping of mappings) {
      if (this.props.location.pathname.startsWith(mapping.pathname)) {
        return mapping.navbarTabId;
      }
    }

    return 'home';
  }

  @autobind
  logOutClicked() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userType');

    this.props.history.push('/');
  }

  @autobind
  async handleNavbarTabChange(navbarTabId: TabId) {
    this.setState({ navbarTabId });
    switch (navbarTabId) {
      case 'home':
        this.props.history.push('/admin');
        break;
      case 'users':
        this.props.history.push('/admin/users');
        break;
      case 'proposals':
        this.props.history.push('/admin/proposals');
        break;
      case 'class':
        this.props.history.push('/admin/class');
        break;
      case 'matching':
        this.props.history.push('/admin/matching');
        break;
      default:
        this.props.history.push('/admin');
    }
  }

  render() {
    return (
      <div className="csci-root">
        <Navbar>
          <Navbar.Group>
            <Navbar.Heading>
              <img src={logo} id="csci-logo" alt="logo" />
            </Navbar.Heading>
          </Navbar.Group>

          <Navbar.Group align={Alignment.RIGHT}>
            <Button onClick={this.logOutClicked} icon="log-out" text="Log Out" minimal={true} />
          </Navbar.Group>

          <Navbar.Group align={Alignment.CENTER}>
            <div id="csci-navbar-tabs">
              <Tabs
                id="navtabs-admin"
                animate={true}
                large={true}
                onChange={this.handleNavbarTabChange}
                selectedTabId={this.state.navbarTabId}
              >
                <Tab id="users" title="Manage Users" />
                <Tab id="proposals" title="Proposals" />
                {/* <Tab id="class" title="Class Overview" /> */}
                <Tab id="matching" title="Project Matching" />
              </Tabs>
            </div>
          </Navbar.Group>
        </Navbar>
        <div className="content">
          <Route exact={true} path={this.props.match.url} render={() => <Redirect to={`${this.props.match.url}/users`} />} />
          <Route path={`${this.props.match.url}/users`} component={UserManagement} />
          <Route path={`${this.props.match.url}/proposals`} component={ProjectProposals} />
          <Route path={`${this.props.match.url}/class`} component={ClassOverview} />
          <Route path={`${this.props.match.url}/matching`} component={ProjectMatching} />
        </div>
      </div>
    );
  }
}

export default withRouter(AdminNavigation);