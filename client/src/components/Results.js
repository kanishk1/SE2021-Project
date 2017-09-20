import React, { Component } from 'react';
import { Tab, Tabs, } from 'react-bootstrap';
import Housing from './Housing.js'
import Demographics from '../components/Demographics.js'
import Lifestyle from '../components/Lifestyle.js'
// import Social from '../components/Social.js'

class Results extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: 1,
      data: this.props.data
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    console.log('selected  ' + key);
    this.setState({key});
  }

  render () {
    return (
      <div>
      <Tabs id="Introduction Tab" activeKey={this.state.key}
          onSelect={this.handleSelect}>
          <Tab eventKey={1} title="Introduction"> 
            <Housing />
          </Tab>
          <Tab eventKey={2} title="Demographics"> 
            <Demographics data={this.props.data[1]}/> 
          </Tab>
          <Tab eventKey={3} title="Lifestyle"> 
             <Lifestyle /> 
          </Tab>
      </Tabs>
      </div>
    )
  }
}

export default Results;
