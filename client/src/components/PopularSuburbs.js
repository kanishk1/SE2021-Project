import React, { Component } from 'react';
import { Thumbnail } from 'react-bootstrap';
import Slider from 'react-slick';
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
    return (
      <Slider {...settings} className="carouselSlider">
        <div>
          <Thumbnail href="/results/chatswood" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Chatswood_NSW_skyline.jpg/220px-Chatswood_NSW_skyline.jpg"} >
            <h2>Chatswood</h2>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail href="/results/kensington" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Main_Walkway%2C_Lower_campus_UNSW.jpg/1200px-Main_Walkway%2C_Lower_campus_UNSW.jpg"} >
            <h2>Kensington</h2>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail href="/results/hornsby" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Hornsby1.jpg/270px-Hornsby1.jpg"} >
            <h2>Hornsby</h2>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail href="/results/deewhy" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Dee_Why_Beach.JPG/270px-Dee_Why_Beach.JPG"} >
            <h2>DeeWhy</h2>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail href="/results/bondi" src={"https://img.othsolutions.com.au/resize/oth/property_photos/003/127/236/7tht7yfnc61fe438tjamnm8ts.jpg"} >
            <h2>Bondi</h2>
          </Thumbnail>
        </div>
        <div>
          <Thumbnail href="/results/artarmon" src={"https://dduaaywsz-res-2.cloudinary.com/image/upload/a_ignore,c_fill,h_420,w_640/v1443413569/melet3fo5pklhljcfaa6.jpg"} >
            <h2>Artarmon</h2>
          </Thumbnail>
        </div>
      </Slider>
    )
  }

}

export default PopularSuburbs;