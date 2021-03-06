import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import MenuGifTokens from '../components/MenuGifTokens';
import Login from '../components/Login';

const Menu = () => (
  <Navbar defaultExpanded={false}>
    <Nav>
      <LinkContainer exact to="/">
        <NavItem eventKey={1}><i className="fas fa-home"></i></NavItem>
      </LinkContainer>
      <LinkContainer to="/historique">
        <NavItem eventKey={2}><i className="fas fa-trophy"></i></NavItem>
      </LinkContainer>
      <LinkContainer to="/stats">
        <NavItem eventKey={3}><i className="fas fa-chart-bar"></i></NavItem>
      </LinkContainer>
      <li className="right">
        <Login />
      </li>
      <MenuGifTokens />
    </Nav>
  </Navbar>
)

export default Menu;
