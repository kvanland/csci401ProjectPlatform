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
import {
  LinkContainer
} from 'react-router-bootstrap';
import Home from './Home';
import ProjectRanking from './ProjectRanking';
import FinalPresentationReviews from './FinalPresentationReviews';
import WeeklyReportForm from './WeeklyReportForm';
import PeerReviewForm from './PeerReviewForm';
import { RouteComponentProps, withRouter } from 'react-router';
import autobind from 'autobind-decorator';
const logo = require('../../svg/logo.svg');

interface IStudentNavigationProps extends RouteComponentProps<any> {
}

interface IStudentNavigationState {
  navbarTabId: TabId;
}

class StudentNavigation extends React.Component<IStudentNavigationProps> {
  state: IStudentNavigationState = {
    navbarTabId: 'home',
  };

  componentDidMount() {
    const navbarTabId = this.inferNavbarTabId();
    this.setState({ navbarTabId });
  }

  componentDidUpdate(oldProps: IStudentNavigationProps) {
    if (oldProps.location.pathname !== this.props.location.pathname) {
      const navbarTabId = this.inferNavbarTabId();
      this.setState({ navbarTabId });
    }
  }

  @autobind
  inferNavbarTabId() {
    const mappings = [
      {
        pathname: '/student/ranking',
        navbarTabId: 'ranking',
      },
      {
        pathname: '/student/reviews',
        navbarTabId: 'review',
      },
      {
        pathname: '/student/weeklyreport',
        navbarTabId: 'report',
      },
      {
        pathname: '/student/peerreview',
        navbarTabId: 'peer',
      },
      {
        pathname: '/student/ranking',
        navbarTabId: 'ranking',
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
        this.props.history.push('/student');
        break;
      case 'profile':
        this.props.history.push('/student/profile');
        break;
      case 'ranking':
        this.props.history.push('/student/ranking');
        break;
      case 'review':
        this.props.history.push('/student/reviews');
        break;
      case 'report':
        this.props.history.push('/student/weeklyreport');
        break;
      case 'peer':
        this.props.history.push('/student/peerreview');
        break;
      default:
        this.props.history.push('/student');
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
                <Tab id="home" title="Home" />
                <Tab id="ranking" title="Project Rankings" />
                <Tab id="review" title="Final Presentation Reviews" />
                <Tab id="report" title="Weekly Reports" />
                <Tab id="peer" title="Peer Reviews" />
              </Tabs>
            </div>
          </Navbar.Group>
        </Navbar>
        <div className="content">
          <Route exact={true} path={this.props.match.url} component={Home} />
          <Route path={`${this.props.match.url}/ranking`} component={ProjectRanking} />
          <Route path={`${this.props.match.url}/reviews`} component={FinalPresentationReviews} />
          <Route path={`${this.props.match.url}/weeklyreport`} component={WeeklyReportForm} />
          <Route path={`${this.props.match.url}/peerreview`} component={PeerReviewForm} />
        </div>
      </div>
    );
  }
}

export default withRouter(StudentNavigation);