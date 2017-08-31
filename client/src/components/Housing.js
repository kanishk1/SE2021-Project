import React, { Component } from 'react';
import '../css/App.css';
import {
  Link
} from 'react-router-dom'


class Housing extends Component {
  state = {};

  render() {
    return (
        <div>
          <div>
            <h2>Housing stuff goes here</h2>
            <iframe src="https://www.realestate.com.au/" width="800px" height="800px"></iframe> 
          </div>         
          <div>
            <Link to="/">Go back to home</Link>
          </div>
        </div>
    );
  }
}


export default Housing;