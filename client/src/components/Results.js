import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import Housing from '../components/Housing.js'
import Demographics from '../components/Demographics.js'
import Lifestyle from '../components/Lifestyle.js'
import Social from '../components/Social.js'

class Results extends Component {

  render () {
    return (
      <Tabs id="Introduction Tab" defaultActiveKey={1} >
        <Tab eventKey={1} title="Introduction">
          <Housing />
        </Tab>
        <Tab eventKey={2} title="Housing">
          <Demographics />
        </Tab>
        <Tab eventKey={3} title="Demographics">
          <Lifestyle />
        </Tab>
        <Tab eventKey={4} title="Social">
          <Social />
        </Tab>
      </Tabs>
    )
  }

}

export default Results;
