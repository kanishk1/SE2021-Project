import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import '../css/Demographics.css';
import placeholder from '../img/placeholder.png'
import {Pie} from 'react-chartjs-2';





class Demographics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  // async photos(query) {
  //   const response = await fetch('/wiki?sub='+query);
  //   const data = await response.json();
  //   console.log(data);
  // }

  render() {
    console.log('in demo ');
    console.log(this.props.data);
    if (this.props.data) {
      var label1 = [];
      var values1 = []
      var i = 0;
      this.props.data.demographics[0].items.forEach(function(element) {
        label1[i] = element.label;
        values1[i] = element.value;
        i++;
      });
      console.log(label1)
      console.log(values1)
      var chart1Data =  {
        labels: label1,
        datasets: [{
            label: 'Age group distribution',
            data: values1,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      };
      var chart1Options =  {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
        }
      }
    }

    return (
      <Grid fluid={true}>
        <Col className="demoCol1" lg={6}>
          <Row className="summary">{/* Red Box*/} 
            <p>
              <strong>Demographics summary goes here.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Row>
          <Row className="chartsOne">{/* Yellow Box*/} 
            <p> Charts here </p>
            <Col className="actualChart1" lg={4}>
              <Pie data={chart1Data} />
            </Col>
            <Col className="actualChart2" lg={4}>
                <Thumbnail src={placeholder} >
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
          <Row className="title">
            <p>Demographics</p>
          </Row>
          <Row className="demoPhotos">{/* Blue Box*/} 
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

export default Demographics;