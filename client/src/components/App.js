import React, { Component } from 'react';
import '../css/App.css';
import Housing from '../components/Housing.js'
import Search from '../components/Search.js'
import Home from '../components/Home.js'
import Demographics from '../components/Demographics.js'
import ProfileSelection from './ProfileSelection.js'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

class App extends Component {

  
  render() {
    return (
    <div>  
      <Router>
      <div>
        <div className="topnav">
          <Link to="/">Home</Link>
          <Link to="/profiles">Profile Selection</Link>
          <Link to="/housing">Housing</Link>
          <Link to="/about">About</Link>
          <Link to="/topics">Topics</Link>
          <Link to="/search">Search</Link>
          <Link to="/demographics">Demographics</Link>
        </div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/profiles" component={ProfileSelection}/>
          <Route path="/housing" component={Housing}/>
          <Route path="/search" component={Search}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
          <Route path="/demographics" component={Demographics}/>
        </Switch>
      </div>
      </Router>        
    </div>
    );
  }

  
}

export default App;
