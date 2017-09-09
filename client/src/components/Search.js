import React, { Component } from 'react';
import '../css/App.css';


class Search extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      searchValue: "",
      suburb: ""
    };
  }

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
        <h2>Welcome to Surburber {this.state.name}</h2>
      </div>

      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>

      <div className="Search">
       <input
          type="text"
          placeholder="Type in your name..."
          value={this.state.searchValue}
          onChange={this.handleNameChange}
        />
        <p></p>
        <input
          type="text"
          placeholder="Search for a Suburb..."
          value={this.state.suburb}
          onChange={this.handleSearchChange}
        />
        <p></p>
        <a href={link} target="_blank"><button className="searchButton">GO!</button></a>
      </div>
    </div>
    );
  }

}

export default Search;