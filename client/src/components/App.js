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
      data: []
    }
    this.handleFetchChange = this.handleFetchChange.bind(this);
    this.assignData= this.assignData.bind(this);
  }

  handleFetchChange(newValue) {
    this.setState({
      isFetching: newValue
    })
    console.log(newValue);
  }
  
  assignData(data) {
    this.setState({
      data: data
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
              />}
            />
            <Route path="/results" render={
              () =>
              <Results data={this.state.data} />}
            />
          </Switch>
        </div>
        </Router>        
      </div>
    );
  }
}

export default App;
