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
    
    //console.log(this.state.data);
    //console.log(this.props.data);
    if (this.state.data) {
        return (
          <Grid fluid={true}>
            <Col className="housingLeft" lg={6}>
              <Row className="housingSummary">
                <p> meh </p>
              </Row>
              <Row className="housingImage">
                <img src="" alt="pls"></img>
              </Row>
            </Col>
            <Col className="housingRight" lg={6}>
              <Row className="prices">
                <Col className="buy" lg={3}>
                  <p> pricesbuy </p>
                </Col>
                <Col className="rent" lg={3}>
                  <p> pricesrent </p>
                </Col>
              </Row>
              <Row className="photos">
                <Col className="photo1" lg={2}>
                  <img src="" alt="photos1"></img>
                </Col>
                <Col className="photo2" lg={2}>
                  <img src="" alt="photos2"></img>
                </Col>
                <Col className="photo3" lg={2}>
                  <img src="" alt="photos3"></img>
                </Col>
                <Col className="photo4" lg={2}>
                  <img src="" alt="photos4"></img>
                </Col>
              </Row>
            </Col>
          </Grid>
        )
    }
  }
}

export default Housing;
