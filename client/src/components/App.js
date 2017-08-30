import React, { Component } from 'react';
import '../css/App.css';
import Housing from '../components/Housing.js'
import Search from '../components/Search.js'
import {
  BrowserRouter as Router,
  Route,
  Link
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
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/housing">Housing</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
          <li><Link to="/search">Search</Link></li>
        </ul>
  
        <hr/>
        <Route path="/housing" component={Housing}/>
        <Route path="/search" component={Search}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
      </div>
      </Router>        
    </div>
    );
  }

  
}

export default App;
