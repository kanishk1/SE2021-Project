import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import '../css/Housing.css';
import placeholder from '../img/placeholder.png'





class housing extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async photos(query) {
    const response = await fetch('/wiki?sub='+query);
    const data = await response.json();
    console.log(data);
  }

  render() {
    //{this.photos('Hurstville,_New_South_Wales')}S
    return (
      <Grid fluid="true">
          <Col className="housCol1" lg={4}>
            <Row className="title">
              <p>Housing</p>
            </Row>
            <Row className="summary">{/* Red Box*/} 
              <p>
                <strong>housing summary goes here.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Row>
          </Col> 
          <Col className="housCol1" lg={8}>
            <Row className="slidingTab">
               <div class="btn-group">
                  <button type="button" class="btn btn-primary">Buy</button>
                  <button type="button" class="btn btn-primary">Rent</button>
                  <button type="button" class="btn btn-primary">Trends</button>
                </div>  
            </Row>
            <Row>
              <Col lg={4} lgOffset={2}>
                <Thumbnail src={placeholder} >
                  <h2>img3</h2>
                </Thumbnail>
              </Col>
              <Col lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>img3</h2>
                </Thumbnail>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>img3</h2>
                </Thumbnail>
              </Col>
              <Col lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>img3</h2>
                </Thumbnail>
              </Col>
              <Col lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>img3</h2>
                </Thumbnail>
              </Col>
            </Row>
          </Col>  
      </Grid>
    )
  }

} 

export default housing;