import React, { Component } from 'react';
import { Tab, Tabs, TabContent, TabContentProps } from 'react-bootstrap';
import Housing from './Housing.js'
import Demographics from '../components/Demographics.js'
import Lifestyle from '../components/Lifestyle.js'
import Social from '../components/Social.js'

class Results extends Component {

  constructor() {
    super();
    this.state = {
      key: 1
    };
    //this.handleSelect = this.handleSelect.bind(this);
  }

  // handleSelect(key) {
  //   console.log('selected  ' + key);
  //   this.setState({key});
  // }

  render () {
    return (
      <div>
      <Housing />
      <Tabs id="Introduction Tab" activeKey={this.state.key}
          >
          {/* <Tab eventKey={1} title="Introduction">  */}
            {/* <TabContent componentClass={Housing}> */}
            {/* </TabContent> */}
          {/* </Tab> */}
          {/* <Tab eventKey={2} title="Demographics">  */}
            {/* // <Demographics />  */}
          {/* // </Tab> */}
          {/* // <Tab eventKey={3} title="Lifestyle">  */}
            {/* // <Lifestyle />  */}
          {/* // </Tab> */}
      </Tabs>
      </div>
    )
  }
}

export default Results;
