import React, { Component } from 'react';
import {Grid, Row, Col, Media} from 'react-bootstrap';
import placeholder from '../img/placeholder.png';
import TweetEmbed from 'react-tweet-embed';
import '../css/Social.css'

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: this.props.news,
      twitter: this.props.twitter
    };
    this.renderNews = this.renderNews.bind(this);
    this.renderTweets = this.renderTweets.bind(this);
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

render(){
return (
  <Grid className='social-news' fluid={true}>
    <Row>
      <Col lg={7}>
        <h1>News</h1>
        {this.renderNews()}
      </Col>
      <Col lg={5}>
        <h1> Twitter </h1>
        {this.renderTweets()}
      </Col>
    </Row>
  </Grid>
  )
}
}

export default Social;
