import React, { Component } from 'react';
import '../css/App.css';


class Home extends Component {
  constructor() {
    super();
    this.state = {
        suburb: "",
        wikiData: {},
    };
  }
  //change query to be more specific
  async wikiApiCall(suburb) {
    const res = await fetch('/wiki?sub='+suburb)
    const data = await res.json();
    this.setState({
      wikiData: data 
    })
  }

  handleButtonClick = () => {
    this.wikiApiCall(this.state.suburb);
  }

  handleInputChange = e => {
    this.setState({
      suburb: e.target.value
    });
  }



  render () {
    return (
      <div>
        <h2> HOME! </h2>
        To search, type with proper capitalisation and replace spaces with underscores.
        Also include state.
        E.g- For Kingsford, search "Kingsford,_New_South_Wales"
        <br></br>
        And have some patience
        <br></br>
        <input 
            type="text"
            placeholder="Enter suburb here"
            value={this.state.suburb}
            onChange={this.handleInputChange}/> 
        <br></br>
        <button autoFocus type="button" onClick={this.handleButtonClick}> Get Wiki Data </button>
        <br></br>
        <div><pre>{JSON.stringify(this.state.wikiData, null, 2)}</pre></div>
        <hr></hr>
      </div>
    )
  }

}

export default Home;