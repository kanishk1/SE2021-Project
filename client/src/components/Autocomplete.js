import Select from 'react-select';
import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import { Button, Form, FormGroup, Radio } from 'react-bootstrap';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedSuburb: this.props.selectedSuburb,
        selectedProfile: this.props.selectedProfile,
        options: []
    };
    this.getSuburbs();
  }
 
  handleSubmit (event) {
    event.preventDefault();
    if ((this.state.selectedSuburb != null) && (this.state.selectedProfile != null)){
      console.log("Ready to submit")
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSuburb !== this.state.selectedSuburb) {
      this.setState({ selectedSuburb: nextProps.selectedSuburb });
    }
    if (nextProps.selectedProfile !== this.state.selectedProfile) {
      this.setState({ selectedProfile: nextProps.selectedProfile });
    }
  }

  async getSuburbs () {
    const response = await fetch('/suburbs');
    const data = await response.json();
    var suburbs = [];
    var i = 0;
    data.docs.forEach(function(elem) {
      suburbs[i] = {};
      suburbs[i].value = elem.name;
      suburbs[i].label = elem.name + ' ' + elem.post;
      i++;
    });
    this.setState({
      options: suburbs
    });
  }

  render () {
    return (
      <div>
       <Select 
          autofocus={true} 
          options={this.state.options}
          clearable={false} 
          value={this.state.selectedSuburb}
          onChange={this.props.updateSuburb} 
          searchable={this.state.searchable}
          noResultsText="No suburbs found..." 
          placeholder="Select a suburb..."
          />
        <p>What kind of a user are you?</p>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup role="form">
            <Radio name="radioGroup" inline onChange={this.props.updateProfile.bind(this,"Investor")}>
              Investor
            </Radio>
            {' '}
            <Radio name="radioGroup" inline onChange={this.props.updateProfile.bind(this,"General User")}>
              General User
            </Radio>
            {' '}
            <Radio name="radioGroup" inline onChange={this.props.updateProfile.bind(this,"Researcher")}>
              Researcher
            </Radio>
            {' '}
            <Button type="submit">Submit</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }

}

export default Autocomplete;