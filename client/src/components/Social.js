import React, { Component } from 'react';
import {Grid, Row, Col, Media, Well} from 'react-bootstrap';
import TweetEmbed from 'react-tweet-embed'
import '../css/Social.css'

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: this.props.news,
      twitter: this.props.twitter,
    };
    this.renderNews = this.renderNews.bind(this);
    this.renderTweets = this.renderTweets.bind(this);
  }


renderNews() {
  var newsData = this.props.news;

  if (this.props.news) {
    return (
      newsData.map(function(value, i){
        return (
          <Media className='news' key={i}>
            <Media.Left align="top">
              <img width={100} height={150} src={value.logoUrl} role="presentation"/>
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
      tweets.map(function(id, i) {
        return (
          <TweetEmbed id={id} key={i}/>
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
        <Well className="News">
          {this.renderNews()}
        </Well>
      </Col>
      <Col lg={4}>
        <div className="twitter">
          <h1> Twitter </h1>
          <Well className="News">
            {this.renderTweets()}
          </Well>
        </div>
      </Col>
    </Row>
  </Grid>
  )
}
}

export default Social;
