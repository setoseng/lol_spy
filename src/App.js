import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search_bar.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Lol Spy</h2>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default App;
