import React, { Component } from 'react';
import {Grid, Row, Col, Media, Thumbnail, Button} from 'react-bootstrap';
import placeholder from '../img/placeholder.png';
import TweetEmbed from 'react-tweet-embed';
import '../css/Social.css'

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: this.props.news,
      twitter: this.props.twitter,
      council: this.props.council,
      police: this.props.police,
      hospital: this.props.hospital
    };
    this.renderNews = this.renderNews.bind(this);
    this.renderTweets = this.renderTweets.bind(this);
    this.renderPolice = this.renderPolice.bind(this);
    this.renderHospital = this.renderHospital.bind(this);
    this.renderCouncil = this.renderCouncil.bind(this);
  }

renderNews() {
  var newsData = this.props.news;

  if (this.props.news) {
    return (
      newsData.map(function(value){
        return (
          <Media className='news'>
            <Media.Left align="top">
              <img width={180} height={180} src={placeholder} role="presentation"/>
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                <strong>
                  <a href={value.url}>{value.name}</a>
                </strong>
              </Media.Heading>
              <i>{value.publishDate}</i><br />
              <i>{value.provider}</i><br /><br />
              <p>{value.description}</p>
            </Media.Body>
          </Media>
        )
      })
    )
  } else {
    console.log("die. no data");
  }
}

renderTweets() {
  var tweets = this.props.twitter;
  if (this.props.twitter) {
    return (
      tweets.map(function(id) {
        return (
          <TweetEmbed id={id} />
        )
      })
    )
  }
}

// renderCouncil() {
//   var council = this.props.council;
//   if (this.props.council) {
//     return (
//       council.map(function(value) {
//         return (
//           <Thumbnail src={"https://maps.googleapis.com/maps/api/place/photo?photoreference="+ value.photos.photo_reference +"&sensor=false&maxheight=196&maxwidth=196&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q"} alt="242x200">
//            <h3>{value.name}</h3>
//            <p>{value.formatted_address}</p>
//            <p>
//              <Button bsStyle="primary">Directions</Button>&nbsp;
//            </p>
//          </Thumbnail>
//         )
//       })
//     )
//   }
// }
//
// renderPolice() {
//   var police = this.props.police;
//   if (this.props.police) {
//     return (
//       police.map(function(value) {
//         return (
//           <Thumbnail src={"https://maps.googleapis.com/maps/api/place/photo?photoreference="+ value.photos.photo_reference +"&sensor=false&maxheight=196&maxwidth=196&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q"} alt="242x200">
//            <h3>{value.name}</h3>
//            <p>{value.formatted_address}</p>
//            <p>
//              <Button bsStyle="primary">Directions</Button>&nbsp;
//            </p>
//          </Thumbnail>
//         )
//       })
//     )
//   }
// }
//
// renderHospital() {
//   var hospital = this.props.hospital;
//   if (this.props.hospital) {
//     return (
//       hospital.map(function(value) {
//         return (
//           <Thumbnail src={"https://maps.googleapis.com/maps/api/place/photo?photoreference="+ value.photos.photo_reference +"&sensor=false&maxheight=196&maxwidth=196&key=AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q"} alt="242x200">
//            <h3>{value.name}</h3>
//            <p>{value.formatted_address}</p>
//            <p>
//              <Button bsStyle="primary">Directions</Button>&nbsp;
//            </p>
//          </Thumbnail>
//         )
//       })
//     )
//   }
// }

// renderResults(place) {
//   if (this.props[place]) {
//     var places = this.props[place].results;
//     var count = 1;
//   }
//
//   var value = [];
//   for (var i = 0; i < count; i++) {
//     if (this.props[place].results[i].name) {
//       value.push()
//     }
//   }
// }

render(){
return (
  <Grid className='social-news' fluid={true}>
    <Row>
      <Col lg={5}>
        <h1>News</h1>
        {this.renderNews()}
      </Col>
      <Col lg={3}>
        <h1> Twitter </h1>
        {this.renderTweets()}
      </Col>
      {/* <Col lg={4}>
        <h1> Oops </h1>
        {this.renderCouncil()}
        {this.renderPolice()}
        {this.renderHospital()}
      </Col> */}
    </Row>
  </Grid>
  )
}
}

export default Social;
