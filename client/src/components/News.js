import React, { Component } from 'react';
import { Thumbnail, Carousel } from 'react-bootstrap';
// import Slider from 'react-slick';
import placeholder from '../img/placeholder.png';
import news1 from '../img/news1.jpg'



class News extends Component {

  render () {
    return (
      <Carousel interval={100} slide={true}>
        <Carousel.Item>
          <img width={500} height={300} alt="900x500" src={news1}/>
          <Carousel.Caption>
            <h3>Seven hurt as car hits pedestrians in Chatswood on Sydney's lower north shore</h3>
            <p>A car has collided with pedestrians outside a shopping mall in Chatswood on Sydney's north shore. A NSW Police spokesperson said the incident on Victoria Avenue was being treated as an accident.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={500} height={300} alt="900x500" src={placeholder}/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={500} height={300} alt="900x500" src={placeholder}/>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
  }

}

export default News;
