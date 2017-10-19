import React, { Component } from 'react';
import '../css/App.css';
import Home from '../components/Home.js'
import Results from '../components/Results.js'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


class App extends Component {

  constructor() {
    super();
    this.state = {
      suburbName: "",
      suburbPostcode: "",
      profile: null,
      suburbs: []
    }
    this.getSuburbs = this.getSuburbs.bind(this)
    this.setUpdatedSuburbs = this.setUpdatedSuburbs.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
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

  updateProfile(newProfile){
    if (newProfile != null) {
      this.setState({
        profile: newProfile
      })
      console.log("New Profile is: ", newProfile)
    }
  }

  render() {   
    return (
      <div>  
        <Router>
        <div>
        <div>
          <Switch>
            <Route exact path="/" render={
              () => 
              <Home sendUpdatedSuburb={this.setUpdatedSuburbs}
                    suburbs={this.state.suburbs}
                    updateProfile={this.updateProfile}
                    profile={this.profile}
              />}
            />
            <Route path="/results/:suburb" render={ ({match}) =>
              <Results suburbName={this.state.suburbName}
                       suburbPostcode={this.state.suburbPostcode}
                       match={match}
                       suburbs={this.state.suburbs}
                       profile={this.state.profile}
                       />
              }
            />
          </Switch>
        </div>
        <Navbar fluid inverse style={{borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px'}}>
          <Navbar.Header>
            <Navbar.Text>
              © 2017 Suburber All Rights Reserved
            </Navbar.Text>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem href="#"> About Us </NavItem>
            <NavItem href="#"> Contact Us </NavItem>
          </Nav> 
        </Navbar>
        </div>
        </Router>        
      </div>
    );
  }
}

export default App;
