import React, { Component } from 'react';
import { Thumbnail } from 'react-bootstrap';
import Slider from 'react-slick';
import placeholder from '../img/placeholder.png'
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



class PopularSuburbs extends Component {

  render () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <Slider {...settings} className="carouselSlider">
        <div>
          <Thumbnail href="#" src={placeholder} >
            <h2>Chatswood</h2>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail href="#" src={placeholder} >
            <h2>Kensington</h2>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail href="#" src={placeholder} >
            <h2>Hornsby</h2>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail href="#" src={placeholder} >
            <h2>DeeWhy</h2>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail href="#" src={placeholder} >
            <h2>Bondi</h2>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail href="#" src={placeholder} >
            <h2>Artarmon</h2>
          </Thumbnail>
        </div>
      </Slider>
    )
  }

}

export default PopularSuburbs;