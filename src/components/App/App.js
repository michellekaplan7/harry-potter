import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Landing from "../Landing/Landing";

class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <main className="App">
        <Switch>
          <Route
          exact
          path="/"
          render={() => {
            return (
              <Landing />
            )
          }}
          />
        </Switch>
      </main>
    );
  }
}

export default App;
