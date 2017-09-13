import React, { Component } from 'react';
import { Grid, Row, Col, Button} from 'react-bootstrap';
import cx from 'classnames';
import '../css/Housing.css';
import '../css/Weather.css';

function GenericWeather({ city, temp, status }) {
  const cls = cx('weather-icon', status);
  return (
    <div className="weather-card">
      <div className={cls} />
      <h1>{temp} &#8451;</h1>
      <p>{city}</p>
    </div>
  );
}


class Housing extends Component {
  state = {};

  render() {
    return (
      <Grid>
        <Col lg={7}>
          <Row>
            <h1>Chatswood, 2067</h1>
          </Row>
          <Row className="wiki">
            <p>
              <strong>Wiki text goes here. </strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Row>
          <Row>
            <Col lg={4}>
              <GenericWeather city="Chatswood" temp={33} status="sun" />
            </Col>
            <Col lg={4}>
              <Row>
                <Col lg={6}>
                  <i className="material-icons">directions_bus</i>
                </Col>
                <Col lg={6}>
                  <i className="material-icons done">done</i>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <i className="material-icons">train</i>
                </Col>
                <Col lg={6}>
                  <i className="material-icons done">done</i>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <i className="material-icons">directions_boat</i>
                </Col>
                <Col lg={6}>
                  <i className="material-icons close">close</i>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <i className="material-icons">tram</i>
                </Col>
                <Col lg={6}>
                  <i className="material-icons close">close</i>
                </Col>
              </Row>
            </Col>
            <Col lg={4}>
              <p><strong>Distances to Popular Places</strong></p>
              <Row>
                <Col lg={6}>
                  Sydney Intl. Airport
                </Col>
                <Col lg={6}>
                  - 30mins
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  Sydney CBD
                </Col>
                <Col lg={6}>
                  - 15mins
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  Circular Quay
                </Col>
                <Col lg={6}>
                  - 12mins
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  Darling Harbour
                </Col>
                <Col lg={6}>
                  - 23mins
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  Bondi Beach
                </Col>
                <Col lg={6}>
                  - 45mins
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={5}>
          <iframe
            width="475"
            height="500"
            frameBorder="0"
            style={{border: 0}}
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC__Vt7Az9hTWwqOmWcsVaVQFEY1qV7LUo
              &q=Chatswood" 
            allowFullScreen>
          </iframe>
          <Button>Council Website</Button>
        </Col>
      </Grid>
    );
  }
}


export default Housing;