import Select from 'react-select';
import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import { Button, Form, FormGroup, Radio } from 'react-bootstrap';
import '../css/Autocomplete.css';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedSuburb: null,
        selectedProfile: null,
        selectedPostcode: null,
        options: this.props.suburbs
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  handleSubmit (event) {
    event.preventDefault();
    if ((this.state.selectedSuburb != null) && (this.state.selectedProfile != null)){
      console.log("Ready to submit")
      this.props.updateSubmission();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSuburb !== this.state.selectedSuburb) {
      this.setState({ selectedSuburb: nextProps.selectedSuburb });
    }
    if (nextProps.selectedProfile !== this.state.selectedProfile) {
      this.setState({ selectedProfile: nextProps.selectedProfile });
    }
    if (nextProps.selectedPostcode !== this.state.selectedPostcode) {
      this.setState({ selectedPostcode: nextProps.selectedPostcode });
    }
    if (nextProps.suburbs !== this.state.options) {
      this.setState({ options: nextProps.suburbs });
    }
  }


  render () {
    return (
      <div className="search">
       <Select 
          autofocus={true} 
          options={this.state.options}
          clearable={false} 
          value={this.state.selectedSuburb + ' ' + this.state.selectedPostcode}
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