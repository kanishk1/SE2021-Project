import React, { Component } from 'react';
import { Tab, Tabs, } from 'react-bootstrap';
import Introduction from './Introduction.js'
import Demographics from '../components/Demographics.js'
import Lifestyle from '../components/Lifestyle.js'
import housing from '../img/resultPage4.png'
import social from '../img/resultPage5.png'
import news from '../img/resultPage6.png'

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
            <Introduction wiki={this.props.data[10]}/>
          </Tab>
          <Tab eventKey={2} title="Demographics"> 
            <Demographics data={this.props.data[1]}/> 
          </Tab>
          <Tab eventKey={3} title="Lifestyle"> 
             <Lifestyle schools={this.props.data[4]} 
              shops={this.props.data[5]}
              food={this.props.data[6]} 
              recreation={this.props.data[7]}
              religious={this.props.data[8]}
              wiki={this.props.data[10]} /> 
          </Tab>
          <Tab eventKey={4} title = "Housing">
          <img src={housing} alt="" height="100%" width="100%"/>            
          </Tab>
          <Tab eventKey={5} title = "Social">
            <img src={social} alt="" height="100%" width="100%"/>
          </Tab>
          <Tab eventKey={6} title = "News">
            <img src={news} alt="" height="100%" width="100%"/>
          </Tab>
      </Tabs>
      </div>
    )
  }
}

export default Results;
