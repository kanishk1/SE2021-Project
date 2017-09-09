import React, { Component } from 'react';
import Slider from 'react-slick';

const SampleNextArrow = (props) => {
    const {className, style, onClick} = props
    return (
      <div
        className={className}
        style={{...style, display: 'block', background: 'red'}}
        onClick={onClick}
      ></div>
    );
  }

  const SamplePrevArrow = (props) => {
    const {className, style, onClick} = props
    return (
      <div
        className={className}
        style={{...style, display: 'block', background: 'green'}}
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
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <Slider {...settings}>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
        <div><h3>5</h3></div>
        <div><h3>6</h3></div>
      </Slider>
    )
  }

}

export default PopularSuburbs;