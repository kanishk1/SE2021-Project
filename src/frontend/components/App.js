import React, { Component } from 'react';
import logo from '../img/logo.svg';
import reactjs from '../img/reactjs.jpg'
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Surburber</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <img src={reactjs} className="App-logo" alt="reactjs memes" />
      </div>
    );
  }
}

export default App;
