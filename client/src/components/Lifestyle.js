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

      var items = [];
      for (var i = 0; i < 4; i++) {
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
  // renderResultsPhotos(place){
  //   if (this.props[place].hasOwnProperty('results')){
  //     if (this.props[place].results[0].hasOwnProperty('photos')){
  //       return "https://maps.googleapis.com/maps/api/place/photo?photoreference="+ this.props[place].results[0].photos[0].photo_reference +"&sensor=false&maxheight=196&maxwidth=196&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q"
  //     }
  //   } else {
  //     return { placeholder }
  //   } 
  // }

  parseWikiHistory(){
    // regex: History ==\\n(.*?)\\n\\n\\n== 
    if (this.props.wiki){
      var string = this.props.wiki.content
      var re = /== Commercial area ==\s(.*)/g;
      var match = re.exec(string);
      if (match != null) {
        return match[1]
      } else {
        console.log("Invalid regex for wikiHistory");
        return "No lifestyle information found :("
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
                {this.parseWikiHistory()}
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
        <Row>
          <Col lgOffset={1} lg={2}>
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
        </Row>
      </Grid>
    )
  }

} 

export default Lifestyle;