import React, { Component } from 'react';
import { Tab, Tabs} from 'react-bootstrap';
import Introduction from './Introduction.js'
import Demographics from '../components/Demographics.js'
import Lifestyle from '../components/Lifestyle.js'
import Social from '../components/Social.js'
import Housing from '../components/Housing.js'
import loading from '../img/loading.gif';

class Results extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: 1,
      isFetching: 1,
      selectedSuburb: this.props.suburbName,
      selectedPostcode: this.props.suburbPostcode,
      // i'll set this up later, if needed
      selectedProfile: null,
      data: [],
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.getData = this.getData.bind(this);
    this.checkSuburb = this.checkSuburb.bind(this);
    this.getSuburbs = this.getSuburbs.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    var self = this;
    var checkSuburb;
    if (!this.props.suburbs.length) {
      this.getSuburbs()
          .then((res) => {
            checkSuburb = res.find(this.checkSuburb, this);
          }).then(function() {
            console.log(checkSuburb)
            self.setState({
              selectedSuburb: checkSuburb.value.slice(0, -5),
              selectedPostcode: checkSuburb.value.slice(-4)
            })
            self.getData();
          });
    } else {
      this.getData();
    }
  }

  handleSelect(key) {
    console.log('selected  ' + key);
    this.setState({key});
  }

  checkSuburb(value) {
    if (value.value.slice(0, -5).replace(/ */g, '').toLowerCase() === this.props.match.params.suburb) {
      return true;
    } else {
      return false;
    }
  }

  // Very ugly as of now, might rehash later
  getData() {
    var self = this;
    return Promise.all([
      fetch('/domain/housing?suburb=' + this.state.selectedSuburb),
      fetch('/domain/demographics?suburb=' + this.state.selectedSuburb),
      fetch('/bing/search?suburb=' + this.state.selectedSuburb + '&num=10'),
      fetch('/weather/' + this.state.selectedPostcode),
      fetch('/places/search?keyword=schools+' + this.state.selectedSuburb + "+NSW"),
      fetch('/places/search?keyword=shops+' + this.state.selectedSuburb + "+NSW"),
      fetch('/places/search?keyword=food+' + this.state.selectedSuburb + "+NSW"),
      fetch('/places/search?keyword=recreation+' + this.state.selectedSuburb + "+NSW"),
      fetch('/places/search?keyword=religious+centres+' + this.state.selectedSuburb + "+NSW"),
      fetch('/twitter/search?suburb=' + this.state.selectedSuburb + '&num=25'),
      fetch('/wiki/search?suburb=' + this.state.selectedSuburb),
      fetch('/places/search?keyword=' + this.state.selectedSuburb + "+NSW"),
      fetch('/domain/listings?suburb=' + this.state.selectedSuburb),
      fetch('/transport/facility?suburb=' + this.state.selectedSuburb),
      fetch('/places/search?keyword=fire+and+rescue' + this.state.selectedSuburb + "+NSW"),
      fetch('/places/search?keyword=police+station+' + this.state.selectedSuburb + "+NSW"),
      fetch('/places/search?keyword=hospital+' + this.state.selectedSuburb + "+NSW")
    ]).then(responses =>
      Promise.all(responses.map(res => res.json())))
    .then(function(response) {
      self.setState({
        isFetching: 0,
        data: response,
      })
      console.log(response);
    }).catch(function(err) {
      console.log(err);
      throw new Error('Couldn\'t get data rip');
    })
  }

  async getSuburbs () {
    const response = await fetch('/suburbs');
    const data = await response.json();
    var suburbs = [];
    var i = 0;
    data.docs.forEach(function(elem) {
      suburbs[i] = {};
      suburbs[i].value = elem.name + ' ' + elem.post;
      suburbs[i].label = elem.name + ' ' + elem.post;
      i++;
    });
    return suburbs;
  }


  render () {
    if (this.state.isFetching === 0) {
      return (
        <div>
        <Tabs id="Introduction Tab" activeKey={this.state.key}
            onSelect={this.handleSelect}>
            <Tab eventKey={1} title="Introduction">
              <Introduction
                wiki={this.state.data[10]}
                name={this.state.selectedSuburb}
                postcode={this.state.selectedPostcode}
                location={this.state.data[11]}
                weather={this.state.data[3]}
                transfac={this.state.data[13]}
                fire={this.state.data[14]}
                police={this.state.data[15]}
                hospital={this.state.data[16]}
                />
            </Tab>
            <Tab eventKey={2} title="Demographics">
              <Demographics data={this.state.data[1]}/>
            </Tab>
            <Tab eventKey={3} title="Lifestyle">
               <Lifestyle schools={this.state.data[4]}
                shops={this.state.data[5]}
                food={this.state.data[6]}
                recreation={this.state.data[7]}
                religious={this.state.data[8]}
                wiki={this.state.data[10]} />
            </Tab>
            <Tab eventKey={4} title="Housing">
                <Housing
                  listings={this.state.data[12]}
                  stats={this.state.data[0]}
                />
            </Tab>
            <Tab eventKey={5} title="Social">
              <Social
                news={this.state.data[2]}
                twitter={this.state.data[9]}

              />
            </Tab>
        </Tabs>
        </div>
      )
    } else if (this.state.isFetching === 1) {
      return (
        <img src={loading} alt="Wait" style={{align: 'center', height:'700px', paddingLeft:'30%'}}/>
      )
    }
  }
}

export default Results;
