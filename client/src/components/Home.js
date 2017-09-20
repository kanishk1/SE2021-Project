import React, { Component } from 'react';
import PopularSuburbs from './PopularSuburbs.js'
import Autocomplete from './Autocomplete.js'
import suburber from '../img/suburber.png';
import { Grid, Row, Col } from 'react-bootstrap';

class Home extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      selectedSuburb: null,
      selectedProfile: null
    }
    this.updateSuburb = this.updateSuburb.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  updateSuburb (newValue) {
    if (newValue != null) {
      this.setState({
        selectedSuburb: newValue.value
      })
      console.log("Selected Suburb is: ", newValue.value)
    }
  }

  updateProfile (newValue) {
    if (newValue != null) {
      this.setState({
        selectedProfile: newValue
      })
      console.log("Selected Profile is: ", newValue)
    }
  }

  render() {
    console.log(this.state);
    return (
      <Grid className="startPage" fluid={true}>
        <Row>
          <Col lgOffset={4} lg={3}>
            <img className="centre-block" src={suburber} alt="suburber"/>
          </Col>
        </Row>
        <Row className="searchBox">
          <Col lgOffset={3} lg={6} >
            <Autocomplete updateSuburb={this.updateSuburb}
                updateProfile={this.updateProfile}
                selectedSuburb={this.state.selectedSuburb}
                selectedProfile={this.state.selectedProfile}/>
          </Col>
        </Row>
        <Row className="carousel">
          <Col lg={6} lgOffset={3}>
            <PopularSuburbs />
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default Home;