import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import '../css/Demographics.css';
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
        <Col className="demoCol1" lg={6}>
          <Row className="summary">{/* Red Box*/} 
            <p>
              <strong>Lifestyle summary goes here.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Row>
          <Row className="chartsOne">{/* Yellow Box*/} 
            <p> Charts here </p>
            <Col className="actualChart1" lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>chart1</h2>
                </Thumbnail>
            </Col>
            <Col className="actualChart2" lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>chart2</h2>
                </Thumbnail>
            </Col>
            <Col className="actualChart3" lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>chart3</h2>
                </Thumbnail>
            </Col>
          </Row>
          <Row className="chartsTwo">{/* Green Box*/} 
            <p> MOAR charts here </p>
            <Col className="actualChart1" lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>chart1</h2>
                </Thumbnail>
            </Col>
            <Col className="actualChart2" lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>chart2</h2>
                </Thumbnail>
            </Col>
            <Col className="actualChart3" lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>chart3</h2>
                </Thumbnail>
            </Col>
          </Row>
        </Col>  
        <Col className="demoCol2" lg={6}>
          <Row className ="title">
            <p>Lifestyle</p>
          </Row>
          <Row className = "demoPhotos">{/* Blue Box*/} 
            <p> Photos here. Function is ready, have to pick an api </p>
            <Col className="actualImg1"  lgOffset={3} lg={3}>
                <Thumbnail src={placeholder} >
                  <h2>img1</h2>
                </Thumbnail>
            </Col>
            <Col className="actualImg2" lg={3}>
                <Thumbnail src={placeholder} >
                  <h2>img2</h2>
                </Thumbnail>
            </Col>
          </Row>
          <Row className="chartsThree">{/* Orange Box*/} 
            <p> SUM MOAR charts here </p>
            <Col className="actualChart1" lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>chart1</h2>
                </Thumbnail>
            </Col>
            <Col className="actualChart2" lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>chart2</h2>
                </Thumbnail>
            </Col>
            <Col className="actualChart3" lg={4}>
                <Thumbnail src={placeholder} >
                  <h2>chart3</h2>
                </Thumbnail>
            </Col>
          </Row>  
        </Col>  
      </Grid>
    )
  }

} 

export default Lifestyle;