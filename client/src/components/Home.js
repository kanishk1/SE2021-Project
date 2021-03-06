import React, { Component } from 'react';
import PopularSuburbs from './PopularSuburbs.js'
import Autocomplete from './Autocomplete.js'
import { Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import '../css/Home.css';
import suburber from '../img/headerLogo.png';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: 0,
      selectedSuburb: null,
      selectedPostcode: null,
      selectedProfile: null,
      suburbs: this.props.suburbs,
      points: [],
    }
    this.updateSuburb = this.updateSuburb.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.updateSubmission = this.updateSubmission.bind(this);
    this.tick = this.tick.bind(this);
    this.drawLineCanvas = this.drawLineCanvas.bind(this);
    this.getDistanceBetween = this.getDistanceBetween.bind(this);
    this.resizeCanvases = this.resizeCanvases.bind(this);
    this.drawImageCanvas = this.drawImageCanvas.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.begin = this.begin.bind(this);
    this.start = this.start.bind(this);
    this.imageRef = this.imageRef.bind(this);
    this.canvasRef = this.canvasRef.bind(this);
  }

  componentDidMount() {
    this.begin();
    console.log(this.state.selectedProfile)
  }


  begin () {
    this.imageCanvasContext = this.imageCanvas.getContext('2d');
    console.log(this.imageCanvasContext);
    this.lineCanvas = document.createElement('canvas');
    this.lineCanvasContext = this.lineCanvas.getContext('2d');
    this.pointLifetime = 1000;
    console.log(this.image.complete);
    if (this.image.complete) {
      console.log('complete');
      this.start();
    } else {
      this.image.onload = this.start.bind(this);
    }
  }
  /**
   * Attaches event listeners and starts the effect.
   */
  start() {
    console.log('starting');
    this.imageCanvas.addEventListener('mousemove', this.handleMouseMove);
    this.imageCanvas.addEventListener('onwheel', this.handleMouseMove);
    window.addEventListener('resize', this.resizeCanvases);
    //var currentDiv = document.getElementById('beforeThis');
    //var idekDiv = document.getElementById('idek');
    //idekDiv.insertBefore(this.imageCanvas, currentDiv);
    // document.body.appendChild(this.imageCanvas);
    if (this.imageCanvas) {
      this.resizeCanvases();
      this.tick();
    }
  }
  
  /**
   * Records the user's cursor position.
   *
   * @param {!MouseEvent} event
   */
  handleMouseMove(event) {
    var newPoints = this.state.points.slice()
    newPoints.push({
      time: Date.now(),
      x: event.offsetX,
      y: event.offsetY
    });
    if (this.imageCanvas) {
      this.setState({
        points: newPoints
      });
    }
  }
  
  /**
   * Resizes both canvases to fill the window.
   */
 resizeCanvases() {
    if (this.imageCanvas) {
      this.imageCanvas.width = this.lineCanvas.width = document.body.clientWidth;
      this.imageCanvas.height = this.lineCanvas.height = window.innerHeight;
    }
  }
  
  /**
   * The main loop, called at ~60hz.
   */
  tick() {
    // Remove old points
    if (this.imageCanvas) {
      var self = this;
      var newPoints = this.state.points.filter(function(point) {
        var age = Date.now() - point.time;
        return age < self.pointLifetime;
      });
  
      this.setState({points: newPoints});
    
      this.drawLineCanvas();
      this.drawImageCanvas();
      //console.log('in tick');
      requestAnimationFrame(this.tick);
    }
  }
  
  /**
   * Draws a line using the recorded cursor positions.
   *
   * This line is used to mask the original image.
   */
  drawLineCanvas() {
    var minimumLineWidth = 25;
    var maximumLineWidth = 100;
    var lineWidthRange = maximumLineWidth - minimumLineWidth;
    var maximumSpeed = 50;
  
    this.lineCanvasContext.clearRect(0, 0, this.lineCanvas.width, this.lineCanvas.height);
    this.lineCanvasContext.lineCap = 'round';
    this.lineCanvasContext.shadowBlur = 30;
    this.lineCanvasContext.shadowColor = '#FFF';
    
    for (var i = 1; i < this.state.points.length; i++) {
      var point = this.state.points[i];
      var previousPoint = this.state.points[i - 1];
  
      // Change line width based on speed
      var distance = this.getDistanceBetween(point, previousPoint);
      var speed = Math.max(0, Math.min(maximumSpeed, distance));
      var percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
      this.lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;
  
      // Fade points as they age
      var age = Date.now() - point.time;
      var opacity = (this.pointLifetime - age) / this.pointLifetime;
      this.lineCanvasContext.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';
      
      this.lineCanvasContext.beginPath();
      this.lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
      this.lineCanvasContext.lineTo(point.x, point.y);
      this.lineCanvasContext.stroke();
    }
  }
  
  /**
   * @param {{x: number, y: number}} a
   * @param {{x: number, y: number}} b
   * @return {number} The distance between points a and b
   */
  getDistanceBetween(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }
  
  /**
   * Draws the original image, masked by the line drawn in drawLineToCanvas.
   */
  drawImageCanvas() {
    // Emulate background-size: cover
    if (this.imageCanvas) {
      var width = this.imageCanvas.width;
      var height = this.imageCanvas.width / this.image.naturalWidth * this.image.naturalHeight;
      
      if (height < this.imageCanvas.height) {
        width = this.imageCanvas.height / this.image.naturalHeight * this.image.naturalWidth;
        height = this.imageCanvas.height;
      }
    
      this.imageCanvasContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
      this.imageCanvasContext.globalCompositeOperation = 'source-over';
      this.imageCanvasContext.drawImage(this.image, 0, 0, width, height);
      this.imageCanvasContext.globalCompositeOperation = 'destination-in';
      this.imageCanvasContext.drawImage(this.lineCanvas, 0, 0);
    }
  }
  
  updateSuburb (newValue) {
    if (newValue != null) {
      this.setState({
        selectedSuburb: newValue.value.slice(0, -5),
        selectedPostcode: newValue.value.slice(-4)
      })
      console.log("Selected Suburb is: ", newValue.value)
      this.props.sendUpdatedSuburb(newValue)
    }
  }

  updateProfile(newValue){
    if(newValue != null){
      this.setState({
        selectedProfile: newValue
      }, this.props.updateProfile(newValue))
    }
  }
  
  updateSubmission (newValue) {
      this.setState({
        isSubmitted: 1
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.suburbs !== this.state.suburbs) {
      this.setState({ suburbs: nextProps.suburbs });
    }
  }

  canvasRef(c) {
    this.imageCanvas = c;
  }

  imageRef(i) {
    this.image = i;
  }
  

  render() {
    if (this.state.isSubmitted === 0) {
      return (
        <div>
          <Navbar inverse fluid staticTop className="navbar">
            <Navbar.Header>
                <Link to={{
                  pathname: '/',
                  state: {isSubmitted: 0} 
                }}>
                  <img src={suburber} alt='logo' style={{height:'50px', width:'200px'}}/>
                </Link>
            </Navbar.Header>
          </Navbar>
          <div id="idek" className="idek">
              <div className="center-content">
              <p className="suburber-title">Suburber</p>
              <p className="byline">Putting suburbs under the microscope</p>
              <div className="startPage" id='pls'>
                <div className="searchBox">
                  <p>Which suburb would you like to know about?</p>
                  <Autocomplete updateSuburb={this.updateSuburb}
                        updateProfile={this.updateProfile}
                        updateSubmission={this.updateSubmission}
                        selectedSuburb={this.state.selectedSuburb}
                        selectedProfile={this.state.selectedProfile}
                        selectedPostcode={this.state.selectedPostcode}
                        suburbs={this.state.suburbs}
                        getData={this.getData}
                        />
                </div>
              </div>
            </div>
            <img src={"https://static.pexels.com/photos/373912/pexels-photo-373912.jpeg"} className="image"
                ref={this.imageRef} role="presentation"
                />
            <canvas ref={this.canvasRef}>
            </canvas>
          </div>
          <Grid>
            <Row className="carousel">
                <Col lg={6} lgOffset={3}>
                  <PopularSuburbs />
                </Col>
            </Row>
            <Row className="teamInfo">
              <Col lg={6} lgOffset={3}>
                <p>
                  Neil Baksi, Front End<br />
                  Jonathan Charles, Back End<br />
                  Kanishk Purohit, Front End<br />
                  Md Mashiur Rahman, Back End<br />
                  Nathaniel Shead, Back End<br />
                  Siddhant Virmani, Front End<br />
                </p>
              </Col>
            </Row>
          </Grid>
        <Navbar fluid inverse style={{borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px'}}>
          <Navbar.Header>
            <Navbar.Text>
              © 2017 Suburber All Rights Reserved
            </Navbar.Text>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem href="#"> About Us </NavItem>
            <NavItem href="#"> Contact Us </NavItem>
          </Nav> 
        </Navbar>
        </div>
      )
    } else {
      var suburb = this.state.selectedSuburb.replace(/ */g, '').toLowerCase();
      return <Redirect push to={"/results/" + suburb} />
    }

  }
}



export default Home;
