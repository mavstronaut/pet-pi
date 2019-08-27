import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Jumbotron from "./components/Jumbotron";
import NavBar from "./components/Nav";
import Audio from "./pages/Audio";



function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Jumbotron />
        <Switch>
          <Route exact path="/" component={Audio}/>
          <Route exact path="/saved" component={Audio}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
