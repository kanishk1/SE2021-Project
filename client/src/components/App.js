import React, { Component } from 'react';
import '../css/App.css';
import Home from '../components/Home.js'
import Results from '../components/Results.js'
import suburber from '../img/suburber.png';
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
      suburbName: "",
      suburbPostcode: "",
      suburbs: []
    }
    this.getSuburbs = this.getSuburbs.bind(this)
    this.setUpdatedSuburbs = this.setUpdatedSuburbs.bind(this);
    this.getSuburbs();
    console.log(this.state.suburbs);
  }

  async getSuburbs () {
    const response = await fetch('/suburbs');
    const data = await response.json();
    var suburbs = [];
    var i = 0;
    data.docs.forEach(function(elem) {
      suburbs[i] = {};
      suburbs[i].value = elem.name + ' ' + elem.post;
      suburbs[i].label = elem.name + ' ' + elem.post;
      i++;
    });
    this.setState({
      suburbs: suburbs
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
              state: {isSubmitted: 0} 
            }}>
              <img src={suburber} alt='logo' style={{height:'50px', width:'200px'}}/>
            </Link>
          </div>
          <Switch>
            <Route exact path="/" render={
              () => 
              <Home sendUpdatedSuburb={this.setUpdatedSuburbs}
                    suburbs={this.state.suburbs}
              />}
            />
            <Route path="/results/:suburb" render={ ({match}) =>
              <Results suburbName={this.state.suburbName}
                       suburbPostcode={this.state.suburbPostcode}
                       match={match}
                       suburbs={this.state.suburbs}
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
