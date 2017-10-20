import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Modal, Button, Panel, Well} from 'react-bootstrap';
import '../css/Lifestyle.css';
import placeholder from '../img/placeholder.png'
import jobData from '../components/jobs.json'

class Lifestyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: this.props.schools,
      shops: this.props.shops,
      food: this.props.food,
      recreation: this.props.recreation,
      religious: this.props.religious,
      wiki: this.props.wiki,
      showModal: false,
      modalPlaceName: "",
    };
    this.renderResults = this.renderResults.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open(place) {
    this.setState({ showModal: true, modalPlaceName: place});
  }
  
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
  }

  renderJobs(){
    if (jobData){
      this.shuffle(jobData.jobs)
      return(
        jobData.jobs.map(function(job, i){
          const title = (
            <h2 className="jobTitle">{job.title}</h2>
          );
          return (
          <Panel header={title} key={i}>
            <p className="company">{job.company}</p> 
            <p className="postedDaysAgo">{job.daysAgo}</p>
            <p className="salary"><strong>Salary</strong>: {job.salary}</p>
            <br />
            <p className="jobsummary">{job.summary}</p>
          </Panel>
          )
        })
      )
    }
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
          items.push(
            <li key={i} onClick={this.open.bind(this, this.props[place].results[i].name)} style={{cursor: 'pointer'}}>
              {this.props[place].results[i].name}
            </li>);
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
        var i = 0
        var max = this.props[place].results.length
        while (i < max) {
          if (this.props[place].results[i].hasOwnProperty('photos')){
            return "https://maps.googleapis.com/maps/api/place/photo?photoreference="+ this.props[place].results[i].photos[0].photo_reference +"&sensor=false&maxheight=196&maxwidth=196&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q"
          }
          i++
        }
      } 
      return placeholder
    }
  }

  parseWiki(){
    // find history or local commerce
    if (this.props.wiki){
      var string = this.props.wiki.content
      
      // Capture all of history
      var histroyRegex = /== History ==\n([\w\s,\.'-:]*)\n/g
      var match = histroyRegex.exec(string);
      if (match != null) {
        return(
          <div className="lifestyle-info">
            <h3>Local History</h3>
            <p>{match[1]}</p>
          </div>
          ) 
      } 

      // Capture first section of commercial area
      var commerceRegex = /== Commercial area ==\s(.*)/g; 
      match = commerceRegex.exec(string);
      if (match != null) {
        return(
          <div className="lifestyle-info">
            <h3>Local Commerce</h3>
            <p>{match[1]}</p>
          </div>
          ) 
      } 

      else {
        console.log("Wiki parsing failed");
        return(
          <div className="lifestyle-info">
            <h3>Local History</h3>
            <p>{this.props.name} was founded by english settlers in 1818. Notably, there are 3 main Aboriginal tribes that trace their roots back to this area of land. Although first contact with the Indigenous Australians led to a small altercation where a spear was thrown and a shot fired, later in the day when the party rowed up Lime Kiln Bay towards present day Mortdale they were greeted in a friendly manner by both men and women, and what could only be described as Australia's first picnic took place as food and drink were shared between the two peoples.</p>
          </div>
          )
      }
    }
  }

  render() {
    //{this.photos('Hurstville,_New_South_Wales')}S
    return (
      <Grid fluid={true}>
      <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalPlaceName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>Here is the best way to get there!</p>
          <iframe
            className="modal-map"
            width="500"
            height="500"
            frameBorder="0"
            src={"https://www.google.com/maps/embed/v1/directions?key=AIzaSyC__Vt7Az9hTWwqOmWcsVaVQFEY1qV7LUo&origin="+this.props.name+"&destination="+this.state.modalPlaceName+","+this.props.name+"&mode=transit"}>
          </iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Row className="lifeRow1">
          <Col className="lifeCol1" lg={6}>
            <Row className="title">
              <p>Lifestyle</p>
            </Row>
            <Row className="">
                {this.parseWiki()}
            </Row>
          </Col>  
          <Col className="lifeCol3" lg={5}> 
            <h3>Local Jobs</h3> 
            <Well className="jobs">
              {this.renderJobs()}
            </Well>
          </Col>
        </Row>
        <Row>
          <Col lgOffset={1} lg={2}>
          <Thumbnail>
              <img className="lifeImg" href="#" src={this.renderResultsPhotos('schools')} >
              </img>
              </Thumbnail>
          </Col>
          <Col lg={2}>
          <Thumbnail>
              <img className="lifeImg" href="#" src={this.renderResultsPhotos('shops')} >
              </img>
              </Thumbnail>
          </Col>
          <Col lg={2}>
          <Thumbnail>
              <img className="lifeImg"  href="#" src={this.renderResultsPhotos('food')} >
              </img>
              </Thumbnail>
          </Col>
          <Col lg={2}>
              <Thumbnail>
              <img className="lifeImg" href="#" src={this.renderResultsPhotos('recreation')} >
              </img>
              </Thumbnail>
          </Col>
          <Col lg={2}>
            <Thumbnail>
              <img className="lifeImg" href="#" src={this.renderResultsPhotos('religious')} >
              </img>
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
