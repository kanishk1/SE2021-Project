import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import '../css/Demographics.css';
import placeholder from '../img/placeholder.png'
import {Pie, Doughnut, Bar, Line, Polar, Radar} from 'react-chartjs-2';

class Demographics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  

  render() {
    console.log('in demo ');
    //console.log(this.props.data);
    var backgroundColor = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ];
    var borderColor = [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ]
    if (this.props.data) {
      var labels = [];
      var values = [];
      var i = 0;
      this.props.data.demographics.forEach(function(element) {
        var j = 0;
        labels[i] = [];
        values[i] = [];
        element.items.forEach(function(element) {
          labels[i][j] = element.label;
          values[i][j] = element.value;
          j++;
        })
        i++;
      })
      console.log(labels);
      console.log(values);
      var chart1Data =  {
        labels: labels[0],
        datasets: [{
            label: 'Age group distribution',
            data: values[0],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };

      // do later, cuz its fucked
      var chart2Data = {
        labels: labels[1],
        datasets: [{
            label: 'Country distribution',
            data: values[1],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };

      var chart3Data = {
        labels: labels[2],
        datasets: [{
            label: 'Occupancy distribution',
            data: values[2],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };

      var chart4Data = {
        labels: labels[7],
        datasets: [{
            label: 'Religion distribution',
            data: values[7],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };

      var chart5Data = {
        labels: labels[9],
        datasets: [{
            label: 'Education distribution',
            data: values[9],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };
    }

    return (
      <Grid fluid={true}>
        <Col className="demoCol1" lg={6}>
          <Row className="chartsOne">{/* Yellow Box*/} 
            <Col className="actualChart1" lg={12}>
              <p> Age group distribution </p>
              <Pie data={chart1Data} width={5} height={2} options={{}}/>
            </Col>
            
          </Row>
          <Row className="chartsTwo">{/* Green Box*/} 
          <Col className="actualChart2" lg={12}>
          <p> Occupancy distribution </p>
          <Doughnut data={chart3Data} width={5} height={2} options={{}}/>
        </Col>
       
          </Row>
        </Col>  
        <Col className="demoCol2" lg={6}>
          <Row className="title">
            <p>Demographics</p>
          </Row>
          <Row className="demoPhotos">{/* Blue Box*/} 
            
            <Col className="actualImg2" lg={12}>
                <img 
                width="400" height="200"
                src="http://demographics.coopercenter.org/files/2016/12/HeaderImage_PopData_600X325.jpg" alt="nah" ></img>
            </Col>
          </Row>
          <Row className="chartsThree">{/* Orange Box*/} 
              <Col className="actualChart3" lg={6}>
              <p> Religion distribution </p>
              <Bar data={chart4Data} width={5} height={5} options={{}}/>
            </Col>
            <Col className="actualChart2" lg={6}>
              <p> Education distribution </p>
              <Line data={chart5Data} width={5} height={5} options={{}}/>
            </Col>
          </Row>  
        </Col>  
      </Grid>
    )
  }

} 

export default Demographics;