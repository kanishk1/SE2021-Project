import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import cx from 'classnames';
import '../css/Introduction.css';
import '../css/Weather.css';
import moment from 'moment';
import policePhoto from '../img/police.jpg'
import firePhoto from '../img/fire.jpg'
import hospoPhoto from '../img/hospo.jpg'

function Weather({min, max, status, day }) {
  const cls = cx('weather-icon', status);
  return (
    <div className="weather-card">
      <p>{day}</p>
      <div className={cls} />
      <h2>{min} &#8451;</h2>
      <h1>{max} &#8451;</h1>
    </div>
  );
}


class Introduction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wiki: this.props.wiki,
      name: this.props.name,
      postcode: this.props.postcode,
      weather: this.props.weather,
      fire: this.props.fire,
      police: this.props.police,
      hospital: this.props.hospital,
    };
    // this.renderPOI = this.renderPOI.bind(this);

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
            -  {this.getDistanceFromLatLonInKm(lat, long, 33.93992280000001, 151.1752764)} km's
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            Sydney CBD
          </Col>
          <Col lg={6}>
            -  {this.getDistanceFromLatLonInKm(lat, long, 33.865143, 151.209900)} km's
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            Circular Quay
          </Col>
          <Col lg={6}>
            -  {this.getDistanceFromLatLonInKm(lat, long, 33.861756, 151.2108839)} km's
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            Darling Harbour
          </Col>
          <Col lg={6}>
            -  {this.getDistanceFromLatLonInKm(lat, long, 33.87488, 151.2009)} km's
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            Bondi Beach
          </Col>
          <Col lg={6}>
            -  {this.getDistanceFromLatLonInKm(lat, long, 33.8914755, 151.2766845)} km's
          </Col>
        </Row>
        </div>
      )
    }
  }

  renderWeather(){
    if (this.props.weather){
      var weather = this.props.weather;

      return (
        <div className="weatherCol">
          <div className="weather-main">
            <Weather min={Math.round(weather[0].min)} max={Math.round(weather[0].max)} status={this.getWeatherStatus(weather[0].conditions)} day={moment().format('dddd')} />
          </div>
          <div className="weather-one">
            <Weather min={Math.round(weather[1].min)} max={Math.round(weather[1].max)} status={this.getWeatherStatus(weather[1].conditions)} day={moment().add(1, 'days').format('dddd')} />
          </div>
          <div className="weather-two">
            <Weather min={Math.round(weather[2].min)} max={Math.round(weather[2].max)} status={this.getWeatherStatus(weather[2].conditions)} day={moment().add(2, 'days').format('dddd')} />
          </div>
          <div className="weather-three">
            <Weather min={Math.round(weather[3].min)} max={Math.round(weather[3].max)} status={this.getWeatherStatus(weather[3].conditions)} day={moment().add(3, 'days').format('dddd')} />
          </div>
          <div className="weather-four">
            <Weather min={Math.round(weather[4].min)} max={Math.round(weather[4].max)} status={this.getWeatherStatus(weather[4].conditions)} day={moment().add(4, 'days').format('dddd')} />
          </div>
        </div>
      )
    }
  }

  getWeatherStatus(input){
    var cloudPattern = new RegExp("cloud");
    var rainPattern = new RegExp("rain");
    var sunPattern = new RegExp("clear");

    if (cloudPattern.test(input)){
      return "cloud"
    }
    else if (rainPattern.test(input)){
      return "rain"
    }
    else if (sunPattern.test(input)){
      return "sun"
    }
    else {
      return "sun"
    }
  }

  renderPOI(place) {
    if (this.props[place]) {
      var places = this.props[place].results;
      var count = 1;
    }

    var name = [];

    var address = [];
    for (var i = 0; i < count; i++) {
      if (this.props[place].results[i]) {
        name.push(this.props[place].results[i].name)
        address.push(this.props[place].results[i].formatted_address)
      }
    }

    if (place == 'police') {
      return(
        <Thumbnail src={policePhoto} >
           <h3>{name}</h3>
           <p>{address}</p>
           <p>
             <Button bsStyle="primary">Directions</Button>&nbsp;
           </p>
         </Thumbnail>)
    } else if (place == 'hospital') {
      return(
        <Thumbnail src={hospoPhoto} >
         <h3>{name}</h3>
         <p>{address}</p>
         <p>
           <Button bsStyle="primary">Directions</Button>&nbsp;
         </p>
       </Thumbnail>
      )
    } else if (place == 'fire') {
      return(
        <Thumbnail src={firePhoto} >
         <h3>{name}</h3>
         <p>{address}</p>
         <p>
           <Button bsStyle="primary">Directions</Button>&nbsp;
         </p>
       </Thumbnail>
      )

   } else {
     return (
      <h1>Couldn\'t render details</h1>
     )
   }
  }


  render() {
    if (this.props.wiki) {
      var wikiSummary = this.props.wiki.summary
      var maps = "https://www.google.com/maps/embed/v1/place?key=AIzaSyC__Vt7Az9hTWwqOmWcsVaVQFEY1qV7LUo&q="+this.state.name+",NSW"
    }
    if (this.props.transfac) {
      const get_status = (mode) =>
        this.props.transfac[mode] ? "done" : "close";

      var bus_status = "done";
      var train_status = get_status("train");
      var ferry_status = get_status("ferry");
      var lr_status = get_status("lightrail");
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
              <p><strong>Transport Access</strong></p>
              <Row>
                <Col className="bus" lgOffset={3} lg={3}>
                  <i className="material-icons">directions_bus</i>
                </Col>
                <Col lgOffset={1} lg={3}>
                  <i className={"material-icons " + bus_status}>{bus_status}</i>
                </Col>
              </Row>
              <Row>
                <Col className="train" lgOffset={3} lg={3}>
                  <i className="material-icons">train</i>
                </Col>
                <Col lgOffset={1} lg={3}>
                  <i className={"material-icons " + train_status}>{train_status}</i>
                </Col>
              </Row>
              <Row>
                <Col className="ferry" lgOffset={3} lg={3}>
                  <i className="material-icons">directions_boat</i>
                </Col>
                <Col lgOffset={1} lg={3}>
                  <i className={"material-icons " + ferry_status}>{ferry_status}</i>
                </Col>
              </Row>
              <Row>
                <Col className="lightrail"lgOffset={3} lg={3}>
                  <i className="material-icons">tram</i>
                </Col>
                <Col lgOffset={1} lg={3}>
                  <i className={"material-icons " + lr_status}>{lr_status}</i>
                </Col>
              </Row>

            </Col>

            <Col className="distancesCol" lgOffset={2} lg={6}>
              <p><strong>Distances to Popular Places</strong></p>
              {this.renderCalculatedDistances()}
            </Col>
          </Row>
          <Row>
            <h1> Local Points of Interest </h1>
            <Col lg={4}>
              {this.renderPOI('fire')}
            </Col>
            <Col lg={4}>
              {this.renderPOI('police')}
            </Col>
            <Col lg={4}>
              {this.renderPOI('hospital')}
            </Col>
          </Row>
        </Col>
        <Col lgOffset={0} lg={4}>
          <iframe
            className="map"
            width="500"
            height="500"
            frameBorder="0"
            src={maps}
            allowFullScreen>
          </iframe>
          <Row>
            <Col className="weatherName" lgOffset={3}>
              <p><strong>Weather</strong></p>
              {this.renderWeather()}
            </Col>
          </Row>
        </Col>
      </Grid>
    );
  }
}


export default Introduction;
