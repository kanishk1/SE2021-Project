import React, { Component } from 'react';
// import {Grid, Row, Col, Thumbnail, Button} from 'react-bootstrap';
// import placeholder from '../img/placeholder.png';
import insta1 from '../img/insta1.png'
import insta2 from '../img/insta2.png'
import insta3 from '../img/insta3.png'

import twat1 from '../img/twat1.png'
import twat2 from '../img/twat2.png'
import twat3 from '../img/twat3.png'
import twat4 from '../img/twat4.png'
// import InstagramEmbed from 'react-social-embed'
// import TweetEmbed from 'react-social-embed'
import { Image } from 'react-bootstrap'
import SplitterLayout from 'react-splitter-layout';

class Social extends Component {
  render(){
  return (
    <SplitterLayout percentage>
      <div className="my-pane">
        <Image src={twat1} responsive />
        <Image src={twat2} responsive />
        <Image src={twat3} responsive />
        <Image src={twat4} responsive />
      </div>
      <div className="my-pane">
        <Image src={insta1} responsive />
        <br> </br>
        <Image src={insta2} responsive />
        <br> </br>
        <Image src={insta3} responsive />
      </div>
    </SplitterLayout>
    )
  }
}

export default Social;
