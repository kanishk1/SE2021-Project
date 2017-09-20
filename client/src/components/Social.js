import React, { Component } from 'react';
import {Grid, Row, Col, Thumbnail, Tabs, Tab, Button} from 'react-bootstrap';
import placeholder from '../img/placeholder.png';
import News from './News.js'

class Social extends Component {
  render(){
  return (
    <Grid className="social-news" fluid={true}>
      <Row>
        <Col lgOffset={1} lg={10}>
          <h1>Social</h1>
          <div>
            <Tabs id="social-tabs" defaultActiveKey={2} >
              <Tab eventKey={1} title="Facebook">
                <Row>
                  <Col lg={4}>
                    <Thumbnail src={placeholder} alt="242x200">
                      <h3>Post 1</h3>
                      <p>Description</p>
                      <p>
                        <Button bsStyle="primary">Button</Button>&nbsp;
                        <Button bsStyle="default">Button</Button>
                      </p>
                    </Thumbnail>
                  </Col>
                  <Col lg={4}>
                    <Thumbnail src={placeholder} alt="242x200">
                      <h3>Post 2</h3>
                      <p>Description</p>
                      <p>
                        <Button bsStyle="primary">Button</Button>&nbsp;
                        <Button bsStyle="default">Button</Button>
                      </p>
                    </Thumbnail>
                  </Col>
                  <Col lg={4}>
                    <Thumbnail src={placeholder} alt="242x200">
                      <h3>Post 3</h3>
                      <p>Description</p>
                      <p>
                        <Button bsStyle="primary">Button</Button>&nbsp;
                        <Button bsStyle="default">Button</Button>
                      </p>
                    </Thumbnail>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey={2} title="Twitter">
                <Row>
                  <Col lg={4}>
                    <Thumbnail src={placeholder} alt="242x200">
                      <h3>Post 1</h3>
                      <p>Description</p>
                      <p>
                        <Button bsStyle="primary">Button</Button>&nbsp;
                        <Button bsStyle="default">Button</Button>
                      </p>
                    </Thumbnail>
                  </Col>
                  <Col lg={4}>
                    <Thumbnail src={placeholder} alt="242x200">
                      <h3>Post 2</h3>
                      <p>Description</p>
                      <p>
                        <Button bsStyle="primary">Button</Button>&nbsp;
                        <Button bsStyle="default">Button</Button>
                      </p>
                    </Thumbnail>
                  </Col>
                  <Col lg={4}>
                    <Thumbnail src={placeholder} alt="242x200">
                      <h3>Post 3</h3>
                      <p>Description</p>
                      <p>
                        <Button bsStyle="primary">Button</Button>&nbsp;
                        <Button bsStyle="default">Button</Button>
                      </p>
                    </Thumbnail>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey={3} title="Instagram">
                <Row>
                  <Col lg={4}>
                    <Thumbnail src={placeholder} alt="242x200">
                      <h3>Post 1</h3>
                      <p>Description</p>
                      <p>
                        <Button bsStyle="primary">Button</Button>&nbsp;
                        <Button bsStyle="default">Button</Button>
                      </p>
                    </Thumbnail>
                  </Col>
                  <Col lg={4}>
                    <Thumbnail src={placeholder} alt="242x200">
                      <h3>Post 2</h3>
                      <p>Description</p>
                      <p>
                        <Button bsStyle="primary">Button</Button>&nbsp;
                        <Button bsStyle="default">Button</Button>
                      </p>
                    </Thumbnail>
                  </Col>
                  <Col lg={4}>
                    <Thumbnail src={placeholder} alt="242x200">
                      <h3>Post 3</h3>
                      <p>Description</p>
                      <p>
                        <Button bsStyle="primary">Button</Button>&nbsp;
                        <Button bsStyle="default">Button</Button>
                      </p>
                    </Thumbnail>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </div>
        </Col>
      </Row>
      <Row className="news-carousel">
        <Col lgOffset={1} lg={12}>
          <h1>News</h1>
          <News />
        </Col>
      </Row>
    </Grid>
    )
  }
}

export default Social;
