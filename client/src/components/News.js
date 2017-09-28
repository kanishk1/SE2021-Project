import React, { Component } from 'react';
import { Thumbnail } from 'react-bootstrap';
import Slider from 'react-slick';
import placeholder from '../img/placeholder.png';

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



class News extends Component {

  render () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <Slider {...settings} className="carouselSlider">
        <div>
          <Thumbnail src={placeholder} >
            <h2>News 1</h2>
            <p>Description</p>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail src={placeholder} >
            <h2>News 2</h2>
            <p>Description</p>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail src={placeholder} >
            <h2>News 3</h2>
            <p>Description</p>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail src={placeholder} >
            <h2>News 4</h2>
            <p>Description</p>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail src={placeholder} >
            <h2>News 5</h2>
            <p>Description</p>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail src={placeholder} >
            <h2>News 6</h2>
            <p>Description</p>
          </Thumbnail>
        </div>
      </Slider>
    )
  }

}

export default News;
