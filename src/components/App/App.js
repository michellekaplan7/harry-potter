import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "../Landing/Landing";
import Header from "../Header/Header";
import Explore from "../Explore/Explore";
import RandomHouse from "../RandomHouse/RandomHouse";
import Advice from "../Advice/Advice";
import SpellsContainer from "../SpellsContainer/SpellsContainer";
import CharactersContainer from "../CharactersContainer/CharactersContainer";

const App = () => {

  return (
    <main className="App">
      <Switch>
        <Route
          path="/explore/characters"
          render={() => {
            return (
              <div>
                <Header />
                <CharactersContainer />
              </div>
            );
          }}
        />
        <Route
          path="/explore/spells"
          render={() => {
            return (
              <div>
                <Header />
                <SpellsContainer />
              </div>
            );
          }}
        />
        <Route
          path="/explore/advice"
          render={() => {
            return (
              <div>
                <Header />
                <Advice />
              </div>
            );
          }}
        />
        <Route
          path="/explore/sort"
          render={() => {
            return (
              <div>
                <Header />
                <RandomHouse />
              </div>
            );
          }}
        />
        <Route
          exact
          path="/explore"
          render={() => {
            return (
              <div>
                <Header />
                <Explore />
              </div>
            );
          }}
        />
        <Route
          exact
          path="/"
          render={() => {
            return (
                <Landing />
            );
          }}
        />
      </Switch>
    </main>
  );
};

export default App;
