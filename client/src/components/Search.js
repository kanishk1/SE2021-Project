import React, { Component } from 'react';
import logo from '../img/logo.svg';
import reactjs from '../img/reactjs.jpg'
import '../css/App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Search extends Component {
  state = {
    name: "",
    suburb: "",
    searchValue: ""
  };

  handleSearchChange = e => {
    const value = e.target.value;

    this.setState({
      suburb: value
    });
  };

  handleNameChange = e => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    });

    if (value === "") {
      this.setState({
        name: "",
      });
    } else {
      this.apiCall(value)
    }
  };

  async apiCall(query) {
    const response = await fetch('hello?q='+query)
    const message  = await response.json()

    this.setState({name: message.name})
  }


  render() {
    var link = 'http://www.google.com/search?q=' + this.state.suburb;

    return (
      <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Surburber {this.state.name}</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <img src={reactjs} className="App-logo" alt="reactjs memes" />

      <input
          type="text"
          placeholder="Type in your name..."
          value={this.state.searchValue}
          onChange={this.handleNameChange}
        />
        <input
          type="text"
          placeholder="Type in your name..."
          value={this.state.suburb}
          onChange={this.handleSearchChange}
        />
        <a href={link}>GO!</a>

    </div>
    );
  }

}

export default Search;