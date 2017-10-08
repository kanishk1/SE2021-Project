import React, { Component } from 'react';
import PopularSuburbs from './PopularSuburbs.js'
import Autocomplete from './Autocomplete.js'
import suburber from '../img/suburber.png';
import { Grid, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Home extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: 0,
      selectedSuburb: null,
      selectedPostcode: null,
      selectedProfile: null,
      suburbs: this.props.suburbs
    }
    this.updateSuburb = this.updateSuburb.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.updateSubmission = this.updateSubmission.bind(this);
  }

  updateSuburb (newValue) {
    if (newValue != null) {
      this.setState({
        selectedSuburb: newValue.value.slice(0, -5),
        selectedPostcode: newValue.value.slice(-4)
      })
      console.log("Selected Suburb is: ", newValue.value)
      this.props.sendUpdatedSuburb(newValue)
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

  updateSubmission (newValue) {
      this.setState({
        isSubmitted: 1
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.suburbs !== this.state.suburbs) {
      this.setState({ suburbs: nextProps.suburbs });
    }
  }


  render() {
    if (this.state.isSubmitted === 0) {
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
                  updateSubmission={this.updateSubmission}
                  selectedSuburb={this.state.selectedSuburb}
                  selectedProfile={this.state.selectedProfile}
                  selectedPostcode={this.state.selectedPostcode}
                  suburbs={this.state.suburbs}
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
    } else {
      var suburb = this.state.selectedSuburb.replace(/ */g, '').toLowerCase();
      return <Redirect push to={"/results/" + suburb} />
    }
    
  }
}

export default Home;