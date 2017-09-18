import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import '../css/Lifestyle.css';
import placeholder from '../img/placeholder.png'





class Lifestyle extends Component {
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
        <Row className="lifeRow1">
          <Col className="lifeCol1" lg={4}>
            <Row className="title">
              <p>Lifestyle</p>
            </Row>
            <Row className="summary">{/* Red Box*/} 
              <p>
                <strong>Lifestyle summary goes here.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Row>
          </Col>  
          <Col className="lifeCol2" lg={3}>
            <Row> 
              <p> Photos here. Function is ready, have to pick an api </p>
              <Thumbnail src={placeholder} >
                  <p>img2</p>
                </Thumbnail>
            </Row>  
          </Col>
          <Col className="lifeCol3" lg={4}>
            <Row > 
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Row>  
          </Col>
        </Row> 
        <Row>
          <Col lg={2}>
              <Thumbnail src={placeholder} >
                <h2>img1</h2>
              </Thumbnail>
          </Col>
          <Col lg={2}>
              <Thumbnail src={placeholder} >
                <h2>img2</h2>
              </Thumbnail>
          </Col>
          <Col lg={2}>
              <Thumbnail src={placeholder} >
                <h2>img3</h2>
              </Thumbnail>
          </Col>
          <Col lg={2}>
              <Thumbnail src={placeholder} >
                <h2>img1</h2>
              </Thumbnail>
          </Col>
          <Col lg={2}>
              <Thumbnail src={placeholder} >
                <h2>img2</h2>
              </Thumbnail>
          </Col>
          <Col lg={2}>
              <Thumbnail src={placeholder} >
                <h2>img3</h2>
              </Thumbnail>
          </Col>
        </Row>
        <Row>
          <Col lg={2} lgOffset={1}>
            <h2>Heading</h2>
               <ul>
                  <li>Coffee</li>
                  <li>Tea</li>
                  <li>Milk</li>
                </ul> 
          </Col>
          <Col lg={2}>
            <h2>Heading</h2>
              <ul>
                  <li>Coffee</li>
                  <li>Tea</li>
                  <li>Milk</li>
                </ul>
          </Col>
          <Col lg={3}>
            <h2>Heading</h2>
              <ul>
                  <li>Coffee</li>
                  <li>Tea</li>
                  <li>Milk</li>
                </ul>
          </Col>
          <Col lg={2}>
            <h2>Heading</h2>
              <ul>
                  <li>Coffee</li>
                  <li>Tea</li>
                  <li>Milk</li>
                </ul>
          </Col>
          <Col lg={2}>
            <h2>Heading</h2>
              <ul>
                  <li>Coffee</li>
                  <li>Tea</li>
                  <li>Milk</li>
                </ul>
          </Col>
        </Row>  
      </Grid>
    )
  }

} 

export default Lifestyle;