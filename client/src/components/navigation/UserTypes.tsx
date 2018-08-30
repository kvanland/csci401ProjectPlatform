import * as React from 'react';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';
import {
  LinkContainer
} from 'react-router-bootstrap';
const logo = require('../../svg/logo.svg');

interface NavigationProps {
  showTabs?: boolean;
}

interface NavigationState {

}

class Navigation extends React.Component<NavigationProps, NavigationState> {
  render() {
    return (
      <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <img src={logo} className="App-logo" alt="logo" />
              </Navbar.Brand>
              <Navbar.Brand>
                <a href="">CSCI 401</a>
              </Navbar.Brand> 
            </Navbar.Header>
            { this.props.showTabs
              ? <Nav>
                  <LinkContainer to="admin">
                    <NavItem eventKey={1}>
                      Admin
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to="stakeholder">
                    <NavItem eventKey={2}>
                      Stakeholder
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to="student">
                    <NavItem eventKey={2}>
                      Student
                    </NavItem>
                  </LinkContainer>
                </Nav>
              : null
            }
          </Navbar>
      </div>
    );
  }
}

export default Navigation;