import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import '../css/Introduction.css';
import '../css/Weather.css';

function GenericWeather({ city, min, max, status, day }) {
  const cls = cx('weather-icon', status);
  return (
    <div className="weather-card">
      <p>{day}</p>
      <div className={cls} />
      <h2>{min} &#8451;</h2>
      <h1>{max} &#8451;</h1>
      <p>{city}</p>
    </div>
  );
}


class Introduction extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      wiki: this.props.wiki,
      name: this.props.name,
      postcode: this.props.postcode
    };
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    d = Math.round(d * 100) / 100
    console.log('distance calc is ', d)
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  renderCalculatedDistances(){
    if (this.props.location){
      var lat = -this.props.location.results[0].geometry.location.lat;
      var long = this.props.location.results[0].geometry.location.lng;

      return (
        <div>
        <Row>
          <Col lg={6}>
            Sydney Intl. Airport
          </Col>
          <Col lg={6}>
            - {this.getDistanceFromLatLonInKm(lat, long, 33.93992280000001, 151.1752764)}km's
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            Sydney CBD
          </Col>
          <Col lg={6}>
            - {this.getDistanceFromLatLonInKm(lat, long, 33.865143, 151.209900)}km's
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            Circular Quay
          </Col>
          <Col lg={6}>
            - {this.getDistanceFromLatLonInKm(lat, long, 33.861756, 151.2108839)}km's
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            Darling Harbour
          </Col>
          <Col lg={6}>
            - {this.getDistanceFromLatLonInKm(lat, long, 33.87488, 151.2009)}km's
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            Bondi Beach
          </Col>
          <Col lg={6}>
            - {this.getDistanceFromLatLonInKm(lat, long, 33.8914755, 151.2766845)}km's
          </Col>
        </Row>
        </div>
      )
    }
  }

  render() {
    if (this.props.wiki) { 
      var wikiSummary = this.props.wiki.summary
      var maps = "https://www.google.com/maps/embed/v1/place?key=AIzaSyC__Vt7Az9hTWwqOmWcsVaVQFEY1qV7LUo&q="+this.state.name
    }
    return (
     
      <Grid fluid={true}>
        <Col className="everything" lg={6}>
          <Row className="suburbName">
            <p>{this.state.name}, {this.state.postcode}</p>
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
              {this.renderCalculatedDistances()}
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
          <Row>
            <Col className="weatherCol" lgOffset={3} lg={4}>
                <GenericWeather city={this.state.name} min={17} max={28} status="rain" day={"monday"}/>
            </Col>
          </Row>
        </Col>
      </Grid>
    );
  }
}


export default Introduction;