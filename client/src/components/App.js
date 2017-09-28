import React, { Component } from 'react';
import '../css/App.css';
import Home from '../components/Home.js'
import Results from '../components/Results.js'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

class App extends Component {

  constructor() {
    super();

    this.state = {
      isFetching: 0,
      data: [],
      suburbName: "",
      suburbPostcode: ""
    }
    this.handleFetchChange = this.handleFetchChange.bind(this);
    this.assignData= this.assignData.bind(this);
    this.setUpdatedSuburbs = this.setUpdatedSuburbs.bind(this);
  }

  handleFetchChange(newValue) {
    this.setState({
      isFetching: newValue
    })
  }
  
  assignData(data) {
    this.setState({
      data: data
    })
  }
  
  setUpdatedSuburbs(newValue){
    this.setState({
      suburbName: newValue.value.slice(0, -5),
      suburbPostcode: newValue.value.slice(-4)
    })
  }

  render() {   
    return (
      <div>  
        <Router>
        <div>
          <div className="topnav">
            <Link to={{
              pathname: '/',
              state: {isFetching: 0} 
            }}>
              Home
            </Link>
          </div>
          <Switch>
            <Route exact path="/" render={
              () => 
              <Home handleFetchChange={this.handleFetchChange}
                    assignData={this.assignData}
                    sendUpdatedSuburb={this.setUpdatedSuburbs}
              />}
            />
            <Route path="/results" render={ () =>
              <Results data={this.state.data} 
                       suburbName={this.state.suburbName}
                       suburbPostcode={this.state.suburbPostcode}
                       />
              }
            />
          </Switch>
        </div>
        </Router>        
      </div>
    );
  }
}

export default App;
