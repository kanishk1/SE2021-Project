import React, { Component } from 'react';
import { Tab, Tabs, } from 'react-bootstrap';
import Introduction from './Introduction.js'
import Demographics from '../components/Demographics.js'
import Lifestyle from '../components/Lifestyle.js'
import Housing from '../components/Housing.js'


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
            <Introduction />
          </Tab>
          <Tab eventKey={2} title="Demographics"> 
            <Demographics data={this.props.data[1]}/> 
          </Tab>
          <Tab eventKey={3} title="Lifestyle"> 
             <Lifestyle /> 
          </Tab>
          <Tab eventKey={4} title = "Housing">
            <Housing data={this.props.data[0]}/>
          </Tab>
      </Tabs>
      </div>
    )
  }
}

export default Results;
