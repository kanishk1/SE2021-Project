import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import { Thumbnail } from 'react-bootstrap';
import Slider from 'react-slick';
import bed from '../img/housingBedIcon.png';
import car from '../img/housingCarIcon.png';
import bath from '../img/housingBathIcon.png';
import { Bar } from 'react-chartjs-2';

const SampleNextArrow = (props) => {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, display: 'block', background: 'black'}}
      onClick={onClick}
    ></div>
  );
}

const SamplePrevArrow = (props) => {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, display: 'block', background: 'black'}}
      onClick={onClick}
    ></div>
  );
}

class Housing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: this.props.listings,
      stats: this.props.stats
    };
    
    this.createCards = this.createCards.bind(this);
  }

  createCards () {
    // const settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 3,
    //   slidesToScroll: 3,
    //   nextArrow: <SampleNextArrow />,
    //   prevArrow: <SamplePrevArrow />
    // };
    var cards = this.state.listings.map(function(value) {
                    return(
                      <div>
                        <Thumbnail src={value.media.url} >
                          <h2>{value.address}</h2>
                          <h3>{value.price}</h3>
                            <p>
                              <img src={bath} alt=""></img> {value.bathrooms}
                              <img src={car} alt=""></img> {value.carspaces}
                              <img src={bed} alt=""></img> {value.bedrooms}
                            </p>
                        </Thumbnail>
                      </div>
                    )
                });

    var oddCards = []
    var evenCards = []
    var i = 0;
    cards.forEach(function(entry) {
      if (i % 2 === 0) {
        oddCards.push(entry);
      } else {
        evenCards.push(entry);
      }
      i++;
    });
    var cardArrays = [oddCards,evenCards];
    return cardArrays;
  }

  getHousingStats () {
    var statsArray = this.state.stats["series"]["seriesInfo"];
    var arraySize = statsArray.length-1;
    var totalMedianSoldPrice = 0;
    var totalMedianRentPrice = 0;
    var totalNumSold = 0;
    var highestSold = 0;
    var lowestSold = 0;
    statsArray.forEach(function(entry) {
      totalMedianSoldPrice += entry["values"]["medianSoldPrice"];
      totalMedianRentPrice += entry["values"]["medianRentListingPrice"];  
      totalNumSold += entry["values"]["numberSold"];
      if (highestSold < entry["values"]["highestSoldPrice"]) {
        highestSold = entry["values"]["highestSoldPrice"];    
      }
      if (lowestSold > entry["values"]["lowestSoldPrice"] || !lowestSold) {
        lowestSold = entry["values"]["lowestSoldPrice"];    
      }
    });
    totalMedianSoldPrice /= arraySize;
    totalMedianRentPrice /= arraySize;
    var newStatsArray = [totalMedianSoldPrice, totalMedianRentPrice, totalNumSold, highestSold, lowestSold];
    return newStatsArray;
  }

  getHousingCharts () {
    var statsArray = this.state.stats["series"]["seriesInfo"];
    var medianSoldPrice = []
    var numberSold = []
    var highestSoldPrice = []
    var lowestSoldPrice = []
    var yearlabels = ['2015', '2016', '2017']
    
    statsArray.forEach(function(entry) {
      medianSoldPrice.push(entry["values"]["medianSoldPrice"]);
      numberSold.push(entry["values"]["numberSold"]);
      highestSoldPrice.push(entry["values"]["highestSoldPrice"]);
      lowestSoldPrice.push(entry["values"]["lowestSoldPrice"]);
    });
    
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
    var medianSoldPriceChart = {
      labels: yearlabels,
      datasets: [{
        label: 'Median Sold Price',
        data: medianSoldPrice,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }]
    };
    
    var numberSoldChart = {
      labels: yearlabels,
      datasets: [{
        label: 'Number Sold',
        data: numberSold,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }]
    };
    
    var highestSoldPriceChart = {
      labels: yearlabels,
      datasets: [{
        label: 'Highest Sold Price',
        data: highestSoldPrice,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }]
    };
    
    var lowestSoldPriceChart = {
      labels: yearlabels,
      datasets: [{
        label: 'Lowest Sold Price',
        data: lowestSoldPrice,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }]
    };
    
    var charts = [medianSoldPriceChart, numberSoldChart, highestSoldPriceChart, lowestSoldPriceChart]
    return charts;
  }
  
  getHousingPhotoCarousel () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    
    var photos = this.state.listings.map(function(value) {
                    return(
                      <div>
                        <Thumbnail src={value.media.url} >
                        </Thumbnail>
                      </div>
                    )
                });
    
    return (
      <Slider {...settings} className="housingCarouselSlider">
        {photos}
      </Slider>
    );  
  }
  
  render () {
    if (this.state.listings) {
        return (
          <Grid fluid={true}>
            <Row className="housingTitleRow">
              <Col className="housingTitleCol" lg={12}>
                <h1>
                  Housing
                </h1>
              </Col>
            </Row>
            <Row className="housingStatsTitleRow">
              <Col className="housingStatsTitleCol">
                <h2>
                  Housing Statistics [2015-Current]
                </h2>
                <p>
                  Here are some general statistics regarding housing for this region
                  and more detailed data from 2015 onwards graphed.
                </p>
              </Col>
            </Row>
            <Row className="housingStats">
              <Col className="housingGenStats" lg={3}>
                <ul class="list-group">
                  <li class="list-group-item"> Average Median Selling Price: ${this.getHousingStats()[0]}</li>
                  <li class="list-group-item"> Average Median Renting Price: ${this.getHousingStats()[1]}</li>
                  <li class="list-group-item"> Average Number Of Sales Per Year: {this.getHousingStats()[2]}</li>
                  <li class="list-group-item"> Most Expensive Sale: ${this.getHousingStats()[3]}</li>
                  <li class="list-group-item"> Least Expensive Sale: ${this.getHousingStats()[4]}</li>
                </ul>
              </Col>
              <Col className="housingDetStats" lg={9}>
                <Row className="housingGraphs">
                  <Col className="housingStats1" lg={2}>
                    <Bar data={this.getHousingCharts()[0]} width={2} height={3} options={{}}/>
                  </Col>
                  <Col className="housingStats2" lg={2}>
                    <Bar data={this.getHousingCharts()[1]} width={2} height={3} options={{}}/>
                  </Col>
                  <Col className="housingStats3" lg={2}>
                    <Bar data={this.getHousingCharts()[2]} width={2} height={3} options={{}}/>
                  </Col>
                  <Col className="housingStats4" lg={2}>
                    <Bar data={this.getHousingCharts()[3]} width={2} height={3} options={{}}/>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="housingPhotoCarouselTitleRow">
              <Col className="housingPhotoCarouselTitleCol" lg={12}>
                <h2>
                  Suburb Snapshot
                </h2>
                <p>
                  What this region generally looks like up close and personal
                </p>
              </Col>
            </Row>
            <Row className="housingPhotoCarouselRow">
              <Col className="housingPhotoCarouselCol" lg={10}>
                {this.getHousingPhotoCarousel()}
              </Col>
            </Row>
            <Row className="housingCardsTitleRow">
              <Col className="housingCardsTitleCol" lg={12}>
                <h2>
                  Property Listings
                </h2>
                <p>
                  Here are some properties in the area which are currently for sale!
                </p>
              </Col>
            </Row>
            <Row className="housingCardsRow">
              <Col className="housingCardsCol1" lg={6}>
                {this.createCards()[0]}
              </Col>
              <Col className="housingCardsCol2" lg={6}>
                {this.createCards()[1]}
              </Col>
            </Row>
          </Grid>
        )
    }
  }
}

export default Housing;
