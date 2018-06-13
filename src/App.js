import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';

import Vainqueur from './Vainqueur';
import Tournois from './Tournois';
import Home from './Home';
import Home2 from './Home2';

const App = () => (
  <Router>
    <div id="layout-app">
      <Navbar defaultExpanded={false}>
        <Nav>
          <LinkContainer to="/">
            <NavItem eventKey={1}><i className="fas fa-home"></i></NavItem>
          </LinkContainer>
          {/* <LinkContainer to="/homeee">
            <NavItem eventKey={1}>Homeee</NavItem>
          </LinkContainer> */}
          <LinkContainer to="/tournois">
            <NavItem eventKey={1}>Tournois</NavItem>
          </LinkContainer>
          <LinkContainer to="/vainqueur">
            <NavItem eventKey={1}>Stats</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
      <div className="main">
        <Route exact path="/" component={Home} />
        <Route path="/home2" component={Home2} />
        <Route path="/tournois" component={Tournois} />
        <Route path="/vainqueur" component={Vainqueur} />
      </div>
    </div>
  </Router>
);

export default App;
