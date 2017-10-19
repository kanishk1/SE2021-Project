import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import '../css/Demographics.css';
import {Pie, Doughnut, Bar, Line} from 'react-chartjs-2';
// Polar, Radar

class Demographics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  
  render() {
    var backgroundColor = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(124, 252, 0, 0.2)'
    ];
    var borderColor = [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(124, 252, 0, 1)'
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

      // We shove the data for anything not in top 6 into other category
      var otherTotal = 0;
      var otherTotal2 = 0;
      values[1].forEach(function(element, index, arr) {
          if (index > 5) {
            otherTotal += element
          }
      });
      values[16].forEach(function(element, index, arr) {
          if (index > 5) {
              otherTotal2 += element
          }
      });
      labels[1] = labels[1].slice(0,6);
      labels[1][6] = "Other";
      values[1] = values[1].slice(0,6);
      values[1][6] = otherTotal;
      
      labels[16] = labels[16].slice(0,6);
      labels[16][6] = "Other";
      values[16] = values[16].slice(0,6);
      values[16][6] = otherTotal2;
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
            label: 'Occupancy Distribution',
            data: values[2],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };

      var chart4Data = {
        labels: labels[7],
        datasets: [{
            label: 'Religion Distribution   ',
            data: values[7],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };

      var chart5Data = {
        labels: labels[9],
        datasets: [{
            label: 'Education Distribution',
            data: values[9],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };
      
      var chart6Data = {
        labels: labels[4],
        datasets: [{
            label: 'Dwelling Structure',
            data: values[4],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };
      
      var chart7Data = {
        labels: labels[6],
        datasets: [{
            label: 'Marital Status',
            data: values[6],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };
      
      var chart8Data = {
        labels: labels[14],
        datasets: [{
            label: 'Labour Force Status',
            data: values[14],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };
      
      var chart9Data = {
        labels: labels[12],
        datasets: [{
            label: 'Household Income',
            data: values[12],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };
      
      var chart10Data = {
        labels: labels[16],
        datasets: [{
            label: 'Industry of Employment',
            data: values[16],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
      };
      
    }

    return (
      <Grid fluid={true}>
        <Col className="titleCol" lg={12}>
          <Row className="title">
            <p>Demographics</p>
          </Row>
          <Row className="subtitle">
            <p> 
              This page contains graphed demographical data 
              pertaining to {this.props.name}
            </p>
          </Row>
        </Col>
        <Col classname="demoCol1" lg={4}>  
          <Row className="chartsOne">{/* Yellow Box*/} 
            <Col className="actualChart1" lg={12}>
              <h3> Age group Distribution </h3>
              <Pie data={chart1Data} width={6} height={4} options={{}}/>
            </Col>  
          </Row>
          <Row className="chartsTwo">{/* Green Box*/} 
            <Col className="actualChart2" lg={12}>
              <h3> Occupancy Distribution </h3>
              <Doughnut data={chart3Data} width={6} height={4} options={{}}/>
            </Col>
          </Row>
          <Row className="chartsFive">
            <Col className="actualChart5" lg={12}>
              <h3> Country Distribution </h3>
              <Pie data={chart2Data} width={6} height={4} options={{}}/>
            </Col>
          </Row>
          <Row className="chartsSix">
            <Col className="actualChart6" lg={12}>
              <h3> Dwelling Structure </h3>
              <Pie data={chart6Data} width={6} height={4} options={{}}/>
            </Col>
          </Row>
        </Col>  
        <Col className="demoCol2" lg={4}>
          <Row className="chartsTen">
            <Col className="actualChart10" lg={12}>
              <h3> Industry of Employment </h3>
              <Pie data={chart10Data} width={6} height={4} options={{}}/>
            </Col>
          </Row>
          <Row className="chartsSeven">
            <Col className="actualChart7" lg={12}>
              <h3> Marital Status </h3>
              <Pie data={chart7Data} width={6} height={4} options={{}}/>
            </Col>
          </Row>
          <Row className="chartsEight">
            <Col className="actualChart8" lg={12}>
              <h3> Labour Force Status </h3>
              <Pie data={chart8Data} width={6} height={4} options={{}}/>
            </Col>
          </Row>
        </Col>
        <Col className="demoCol3" lg={4}>
          <Row className="chartsThree">{/* Orange Box*/}
            <Col className="actualChart3" lg={12}>
              <h3> Religion Distribution </h3>
              <Bar data={chart4Data} width={5} height={5} options={{}}/>
            </Col>
          </Row>
          <Row className="chartsFour">
            <Col className="actualChart4" lg={12}>
              <h3> Education Distribution </h3>
              <Line data={chart5Data} width={5} height={5} options={{}}/>
            </Col>
          </Row>
          <Row className="chartsNine">
            <Col className="actualChart9" lg={12}>
              <h3> Household Income </h3>
              <Bar data={chart9Data} width={5} height={5} options={{}}/>
            </Col>
          </Row>
        </Col>  
      </Grid>
    )
  }

} 

export default Demographics;
