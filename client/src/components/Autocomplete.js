import Select from 'react-select';
import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import { Button, ButtonToolbar, ToggleButton, ToggleButtonGroup, Popover, OverlayTrigger } from 'react-bootstrap';
import '../css/Autocomplete.css';

const investorPopover = (
  <Popover id="popover-trigger-hover-focus" title="Profiles">
    Pick your profile to see the most relevant information for you!
  </Popover>
);


class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedSuburb: null,
        selectedProfile: this.props.selectedProfile,
        selectedPostcode: null,
        options: this.props.suburbs
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  handleSubmit (event) {
    if ((this.state.selectedSuburb != null) && (this.state.selectedProfile != null)){
      console.log("Ready to submit")
      this.props.updateSubmission();
    }
  }

  updateProfile(newValue){
    if(newValue != null){
      this.setState({
        selectedProfile: newValue
      }, this.props.updateProfile(newValue))
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
        <Button onClick={this.handleSubmit}>Submit!</Button>
        <p>What kind of a user are you?</p>
        <ButtonToolbar>
          <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={investorPopover}>
          <ToggleButtonGroup type="radio" name="options">
            <ToggleButton onChange={this.updateProfile.bind(this,"Investor")} value={1}>Investor</ToggleButton> 
            <ToggleButton onChange={this.updateProfile.bind(this,"General")} value={2}>General User</ToggleButton>
            <ToggleButton onChange={this.updateProfile.bind(this,"Researcher")} value={3}>Researcher</ToggleButton>
          </ToggleButtonGroup>
           </OverlayTrigger>
        </ButtonToolbar>
      </div>
    )
  }

}

export default Autocomplete;