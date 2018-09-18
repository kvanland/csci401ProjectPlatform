import * as React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand
} from 'reactstrap';
import {
  LinkContainer
} from 'react-router-bootstrap';
const logo = require('../../svg/logo.svg');

interface INavigationProps {
  showTabs?: boolean;
}

interface INavigationState {

}

class Navigation extends React.Component<INavigationProps, INavigationState> {
  render() {
    return (
      <div>
        <Navbar>
          <NavbarBrand>
            <img src={logo} className="App-logo" alt="logo" />
          </NavbarBrand>
          <NavbarBrand>
            <a href="/">CSCI 401</a>
          </NavbarBrand>
          {this.props.showTabs
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