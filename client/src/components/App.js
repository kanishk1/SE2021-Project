import React, { Component } from 'react';
import '../css/App.css';
import Home from '../components/Home.js'
import Results from '../components/Results.js'
import Housing from '../components/Housing.js'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

class App extends Component {

  
  render() {
    return (
    <div>  
      <Router>
      <div>
        <div className="topnav">
          <Link to="/">Home</Link>
          <Link to="/results"> Result </Link>
        </div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/results" component={Results}/>
        </Switch>
      </div>
      </Router>        
    </div>
    );
  }

  
}

export default App;
