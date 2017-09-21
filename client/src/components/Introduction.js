import React, { Component } from 'react';
import { Grid, Row, Col, Button} from 'react-bootstrap';
import cx from 'classnames';
import '../css/Introduction.css';
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


class Introduction extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      wiki: this.props.wiki,
    };
  }

  wikiIntroText(){
    if (this.props.wiki) { 
      return this.props.wiki.summary
    }
    console.log("called it !!!")
  }
  render() {
    console.log('in intro, the wiki data is ');
    if (this.props.wiki) { 
      var wikiSummary = this.props.wiki.summary
      var name = this.props.wiki.info.name
      var postcode = this.props.wiki.info.postcode
      var maps = "https://www.google.com/maps/embed/v1/place?key=AIzaSyC__Vt7Az9hTWwqOmWcsVaVQFEY1qV7LUo&q="+this.props.wiki.info.name
    }
    return (
     
      <Grid fluid={true}>
        <Col className="everything" lg={6}>
          <Row className="suburbName">
            <p>{name}, {postcode}</p>
          </Row>
          <Row className="wiki">
            <p>
              {wikiSummary}
            </p>
          </Row>
          <Row className="suburbData">
            <Col className="transportCol" lg={4}>
              <Row>
                <Col className="bus" lgOffset={3} lg={3}>
                  <i className="material-icons">directions_bus</i>
                </Col>
                <Col lgOffset={1} lg={3}>
                  <i className="material-icons done">done</i>
                </Col>
              </Row>
              <Row>
                <Col className="train" lgOffset={3} lg={3}>
                  <i className="material-icons">train</i>
                </Col>
                <Col lgOffset={1} lg={3}>
                  <i className="material-icons done">done</i>
                </Col>
              </Row>
              <Row>
                <Col className="ferry" lgOffset={3} lg={3}>
                  <i className="material-icons">directions_boat</i>
                </Col>
                <Col lgOffset={1} lg={3}>
                  <i className="material-icons close">close</i>
                </Col>
              </Row>
              <Row>
                <Col className="lightrail"lgOffset={3} lg={3}>
                  <i className="material-icons">tram</i>
                </Col>
                <Col lgOffset={1} lg={3}>
                  <i className="material-icons close">close</i>
                </Col>
              </Row>
            </Col>
            <Col className="distancesCol" lgOffset={2} lg={6}>
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
        <Col lgOffset={1} lg={4}>
          <iframe
            className="map"
            width="500"
            height="500"
            frameBorder="0"
            src={maps} 
            allowFullScreen>
          </iframe>
          <Button className="CouncilButton">Council Website</Button>
          <Row>
            <Col className="weatherCol" lgOffset={3} lg={4}>
                <GenericWeather city={name} temp={28} status="sun" />
            </Col>
          </Row>
        </Col>
      </Grid>
    );
  }
}


export default Introduction;