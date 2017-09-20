import React, { Component } from 'react';
import PopularSuburbs from './PopularSuburbs.js'
import Autocomplete from './Autocomplete.js'
import suburber from '../img/suburber.png';
import { Grid, Row, Col } from 'react-bootstrap';

class Home extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      isFetching: 0,
      selectedSuburb: null,
      selectedPostcode: null,
      selectedProfile: null
    }
    this.updateSuburb = this.updateSuburb.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.getData = this.getData.bind(this);
  }

  updateSuburb (newValue) {
    if (newValue != null) {
      this.setState({
        selectedSuburb: newValue.value.slice(0, -5),
        selectedPostcode: newValue.value.slice(-4)
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

  // Very ugly as of now, might rehash later
  getData() {
    this.setState({
      isFetching: 0.5
    })
    return Promise.all([
      fetch('/domain/housing?suburb=' + this.state.selectedSuburb),
      fetch('/domain/demographics?suburb=' + this.state.selectedSuburb),
      fetch('/bing/search?suburb=' + this.state.selectedSuburb
        + '&num=10'),
      fetch('/weather/' + this.state.selectedPostcode),
      fetch('/places/search?keyword=' + this.state.selectedSuburb),
      fetch('/twitter/search?suburb=' + this.state.selectedSuburb + '&num=25'),
      fetch('/wiki/search?suburb=' + this.state.selectedSuburb)      
    ]).then(responses =>
      Promise.all(responses.map(res => res.json())))
    .then(function(response) {
      console.log(response);
    }).catch(function(err) {
      throw Error('Couldn\'t get data rip');
    })
  }

  render() {
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
                selectedProfile={this.state.selectedProfile}
                selectedPostcode={this.state.selectedPostcode}
                getData={this.getData}/>
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