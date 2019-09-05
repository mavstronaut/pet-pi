import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Jumbotron from "./components/Jumbotron";
import NavBar from "./components/Nav";
import Books from "./pages/Books";

// might consider moving switch to route to a separate login page, else its going on saved

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Jumbotron />
        <Switch>
          <Route exact path="/" component={Books}/>
          <Route exact path="/saved" component={Books}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
