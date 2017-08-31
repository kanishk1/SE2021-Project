import React, { Component } from 'react';
import '../css/App.css';
import App from '../components/App.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Housing extends Component {
  state = {};

  render() {
    return (
        <div>
          <div>
            <h2>Housing stuff goes here</h2>
          </div>         
          <div>
            <Link to="/">Go back to home</Link>
          </div>
        </div>
    );
  }
}


export default Housing;