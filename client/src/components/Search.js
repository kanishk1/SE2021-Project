import React, { Component } from 'react';
import '../css/App.css';


class Search extends Component {
  state = {
    name: "",
    searchValue: "",
  };

  handleSearchChange = e => {
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
    return (
      <div className="App">
      <div className="App-header">
        <h2>Welcome to Surburber {this.state.name}</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>

      <input
          type="text"
          placeholder="Type in your name..."
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
        />

    </div>
    );
  }

}

export default Search;