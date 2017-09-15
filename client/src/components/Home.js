import React, { Component } from 'react';
import PopularSuburbs from './PopularSuburbs.js'
import Autocomplete from './Autocomplete.js'
import suburber from '../img/suburber.png';
import { Grid, Row, Col} from 'react-bootstrap';

class Home extends Component {

  render () {
    return (
      <Grid className="startPage" fluid="true">
        <Row>
          <Col lgOffset={4} lg={3}>
            <img className="centre-block" src={suburber} alt="suburber"/>
          </Col>
        </Row>
        <Row className="searchBox">
          <Col lgOffset={3} lg={6} >
            <Autocomplete />
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