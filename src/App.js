import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import createHotel from '../src/createHotel'
import {BrowserRouter as Router , Route, Link,Switch } from "react-router-dom";
import Home from '../src/Home'
class App extends Component {
  render() {
    return (
        <Router>
     <Switch>
       <Route exact path="/" component={Home}></Route>
       <Route path="/createHotel" component={createHotel}></Route>
     </Switch>
     </Router>
    );
  }
}

export default App;
