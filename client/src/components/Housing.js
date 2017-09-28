import React, { Component } from 'react';
import { Grid, Row, Col, Button} from 'react-bootstrap';


class Housing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render () {
    console.log(this.props.data);
    console.log(this.state.data);
    return (
      <Grid fluid={true}>
        <Col className="housingLeft" lg={6}>
          <Row className="hosuingSummary">
            <p> some shit </p>
          </Row>
          <Row className="housingImage">
            <img src="" alt="pls"></img>
          </Row>
        </Col>
        <Col className="housingRight" lg={6}>
          <Row className="prices">
            <Col className="buy" lg={3}>
            </Col>
            <Col className="rent" lg={3}>
            </Col>
          </Row>
          <Row className="photos">
            <Col className="photo1" lg={2}>
            </Col>
            <Col className="photo2" lg={2}>
            </Col>
            <Col className="photo3" lg={2}>
            </Col>
            <Col className="photo4" lg={2}>
            </Col>
          </Row>
        </Col>
      </Grid>
    )
  }
}

export default Housing;