import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import { Thumbnail } from 'react-bootstrap';
import Slider from 'react-slick';
import bed from '../img/housingBedIcon.png';
import car from '../img/housingCarIcon.png';
import bath from '../img/housingBathIcon.png';
import housingPhoto from '../img/housingStockPhoto.jpg';
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
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
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

    return (
      <Slider {...settings} className="carouselSlider">
        {cards}
      </Slider>
    );
  }

  parseHousingStats () {
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
      totalNumSold += entry["values"]["auctionNumberSold"];
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
  
  render () {
    // console.log(this.state.data);
    //console.log(this.props.data);
    if (this.state.listings) {
        return (
          <Grid fluid={true}>
            <Row className="row1">
              <Col className="housingTitle" lg={6}>
                <h1> 
                  Housing 
                </h1>
                <p>
                  This suburb has a median selling price of ${this.parseHousingStats()[0]} and
                  also has a median renting price of ${this.parseHousingStats()[1]}.
                  In recent years, approximately {this.parseHousingStats()[2]} properties 
                  have been sold in this area. Similarly properties have sold for prices
                  as high as ${this.parseHousingStats()[3]} and as low as ${this.parseHousingStats()[4]}!
                </p>
              </Col>
              <Col className="housingPhoto" lg={6}>
                <img src={housingPhoto} alt=""></img>
              </Col>
            </Row>
            <Row className="housingCarouselrow">
              <Col className="housingCarouselCol" lg={8}>
                {this.createCards()}
              </Col>
            </Row>
          </Grid>
        )
    }
  }
}

export default Housing;
