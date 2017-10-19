import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import { Thumbnail } from 'react-bootstrap';
import Slider from 'react-slick';
import bed from '../img/bed.png';
import car from '../img/transport.png';
import bath from '../img/bathtub.png';
import { Bar } from 'react-chartjs-2';
import '../css/Housing.css';

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
      stats: this.props.stats,
      name: this.props.name,
      photos: this.props.photos,
    };
    
    this.createCards = this.createCards.bind(this);
  }

  createCards () {
    var cards = this.state.listings.map(function(value, i) {
                    var link = "http://www.domain.com.au/"+value.id;
                    return(
                        <div key={i}>
                          <Thumbnail src={value.media.url}>
                            <h2><a href={link} target="_">{value.address}</a></h2>
                            <h3>{value.price}</h3>
                              <div>
                                <img src={bath} alt=""></img> {value.bathrooms}
                                <img src={car} alt=""></img> {value.carspaces}
                                <img src={bed} alt=""></img> {value.bedrooms}
                              </div>
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

    newStatsArray.forEach(function(part, index, arr) {
      arr[index] = part.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
    
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
    ];
    var borderColor = [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
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
      dots: false,
      draggable: true,
      swipeToSlide: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay:  true,
      autoplaySpeed: 10000,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    
    var photoarray = [];
    var rawphotoarray = this.props.photos.result.photos;
    rawphotoarray.forEach(function(element, index, arr) {
        photoarray.push("https://maps.googleapis.com/maps/api/place/photo?photoreference="+element.photo_reference+"&sensor=false&maxheight=400&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q");
    });
    var photos = photoarray.map(function(value, i) {
                    return(
                      <div key={i}>
                        <Thumbnail src={value} >
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
    var options = {
        legend: {
            display: false,
        },
    };
    if (this.state.listings) {
        return (
          <Grid fluid={true}>
            <Row className="housingTitleRow">
              <Col className="housingTitleCol" lg={12}>
                <p>
                  Housing
                </p>
              </Col>
            </Row>
            <Row className="housingStatsTitleRow">
              <Col className="housingStatsTitleCol" lg={12}>
                <h3>
                  Housing Statistics
                </h3>
                <p>
                  Here are some general housing statistics for {this.props.name} and
                  also more in-depth data from 2015 onwards.
                </p>
              </Col>
            </Row>
            <Row className="housingStats">
              <Col className="housingGenStats" lg={2}>
                <ul className="list-group">
                  <li className="list-group-item"> Average Median Selling Price: ${this.getHousingStats()[0]}</li>
                  <li className="list-group-item"> Average Median Renting Price: ${this.getHousingStats()[1]}</li>
                  <li className="list-group-item"> Average Number Of Sales Per Year: {this.getHousingStats()[2]}</li>
                  <li className="list-group-item"> Most Expensive Sale: ${this.getHousingStats()[3]}</li>
                  <li className="list-group-item"> Least Expensive Sale: ${this.getHousingStats()[4]}</li>
                </ul>
              </Col>
              <Col className="housingDetStats" lg={10}>
                <Row className="housingGraphs">
                  <Col className="housingStats1" lg={3}>
                    <h3>Median Property Prices</h3>
                    <Bar data={this.getHousingCharts()[0]} width={4} height={4} options={options}/>
                  </Col>
                  <Col className="housingStats2" lg={3}>
                    <h3>Number of Houses Sold</h3>
                    <Bar data={this.getHousingCharts()[1]} width={4} height={4} options={options}/>
                  </Col>
                  <Col className="housingStats3" lg={3}>
                    <h3>Maximum Sale Price</h3>
                    <Bar data={this.getHousingCharts()[2]} width={4} height={4} options={options}/>
                  </Col>
                  <Col className="housingStats4" lg={3}>
                    <h3>Minimum Sale Prices</h3>
                    <Bar data={this.getHousingCharts()[3]} width={4} height={4} options={options}/>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="housingPhotoCarouselTitleRow">
              <Col className="housingPhotoCarouselTitleCol" lg={12}>
                <h3>
                  Suburb Snapshot
                </h3>
                <p>
                  Take a look into what {this.props.name} looks like up close!
                </p>
              </Col>
            </Row>
            <Row className="housingPhotoCarouselRow">
              <Col lg={1}></Col>
              <Col className="housingPhotoCarouselCol" lg={10}>
                {this.getHousingPhotoCarousel()}
              </Col>
              <Col lg={1}></Col>
            </Row>
            <Row className="housingCardsTitleRow">
              <Col className="housingCardsTitleCol" lg={12}>
                <h3>
                  Property Listings
                </h3>
                <p>
                  Here are some properties in {this.props.name} which are currently for sale!
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
