import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import '../css/Lifestyle.css';
import placeholder from '../img/placeholder.png'

class Lifestyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: this.props.schools,
      shops: this.props.shops,
      food: this.props.food,
      recreation: this.props.recreation,
      religious: this.props.religious,
      wiki: this.props.wiki
    };
    this.renderResults = this.renderResults.bind(this);
  }

  renderResults(place){
    if (this.props[place]){
      var places = this.props[place].results;
      var count = 0
      if (places.length > 10){
        count = 10;
      } else {
        count = places.length;
      }

      var items = [];
      for (var i = 0; i < count; i++) {
        if (this.props[place].results[i].name){
          items.push(<li key={i}>{this.props[place].results[i].name}</li>);
        }
      }
      return (
         <ul>
          {items}
         </ul>
      );
    }
  }

  // Tried to render photos, its buggy 
  // usage: <Thumbnail src={this.renderResultsPhotos('schools')} >
  renderResultsPhotos(place){
    if (this.props[place]) {
      if (this.props[place].hasOwnProperty('results')){
        if (this.props[place].results[0].hasOwnProperty('photos')){
          return "https://maps.googleapis.com/maps/api/place/photo?photoreference="+ this.props[place].results[0].photos[0].photo_reference +"&sensor=false&maxheight=196&maxwidth=196&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q"
        }
      } else {
        return { placeholder }
      } 
    }
  }

  parseWiki(){
    // find history or local commerce
    if (this.props.wiki){
      var string = this.props.wiki.content
      
      // Capture first section of commercial area
      var commerceRegex = /== Commercial area ==\s(.*)/g; 
      var match = commerceRegex.exec(string);
      if (match != null) {
        return match[1]
      } 

      // Capture all of history
      var histroyRegex = /== History ==\n([\w\s,\.'-:]*)\n/g
      match = histroyRegex.exec(string);
      if (match != null) {
        return match[1]
      } 

      else {
        console.log("Wiki parsing failed");
        return "No local commerce or history information found"
      }
    }
  }

  render() {
    //{this.photos('Hurstville,_New_South_Wales')}S
    return (
      <Grid fluid={true}>
        <Row className="lifeRow1">
          <Col className="lifeCol1" lg={4}>
            <Row className="title">
              <p>Lifestyle</p>
            </Row>
            <Row className="">
              <p>
                {this.parseWiki()}
              </p>
            </Row>
          </Col>  
          <Col className="lifeCol2" lg={3}>
            <Row> 
              <Thumbnail src={placeholder} >
                
              </Thumbnail>
            </Row>  
          </Col>
          <Col className="lifeCol3" lg={4}> 
          </Col>
        </Row>
        <Row>
          <Col lgOffset={1} lg={2}>
              <Thumbnail src={this.renderResultsPhotos('schools')} >
              </Thumbnail>
          </Col>
          <Col lg={2}>
              <Thumbnail src={this.renderResultsPhotos('shops')} >
              </Thumbnail>
          </Col>
          <Col lg={2}>
              <Thumbnail src={this.renderResultsPhotos('restaurants')} >
              </Thumbnail>
          </Col>
          <Col lg={2}>
              <Thumbnail src={this.renderResultsPhotos('recreation')} >
              </Thumbnail>
          </Col>
          <Col lg={2}> 
              <Thumbnail src={this.renderResultsPhotos('religious')} >
              </Thumbnail>
          </Col>
        </Row>
        <Row>
          <Col lg={2} lgOffset={1}>
            <h2>Educational Institutions</h2>
              {this.renderResults("schools")}
          </Col>
          <Col lg={2}>
            <h2>Shops Nearby</h2>
              {this.renderResults("shops")}
          </Col>
          <Col lg={2}>
            <h2>Eating Joints</h2>
              {this.renderResults("food")}
          </Col>
          <Col lg={2}>
            <h2>Recreational Spots</h2>
              {this.renderResults("recreation")}
          </Col>
          <Col lg={2}>
            <h2>Religious Institutions</h2>
              {this.renderResults("religious")}
          </Col>
        </Row> 
      </Grid>
    )
  }

} 

export default Lifestyle;