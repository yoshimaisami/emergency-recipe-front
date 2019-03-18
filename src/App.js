import React, { Component } from "react";
import Title from "./Title.js";
import SearchBar from "./SearchBar";
import { Container } from 'react-materialize';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <main>
            <div className="title">
              <Title />
            </div>

            <div className="search-bar">
              <SearchBar />
            </div>
          </main>
        </Container>
      </div>
    );
  }
}

export default App;
