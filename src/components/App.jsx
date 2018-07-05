import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Menu from './Menu';
import Routing from './Routing';

import './App.css';

const App = () => (
  <BrowserRouter>
    <div id="layout-app">
      <Menu />
      <Routing />
    </div>
  </BrowserRouter>
)

export default App;
