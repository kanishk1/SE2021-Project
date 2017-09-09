import Select from 'react-select';
import React, { Component } from 'react';
import 'react-select/dist/react-select.css';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectValue: ""
    };
    this.updateValue = this.updateValue.bind(this)
  }
 
  updateValue (newValue) {
    if (newValue != null) {
      this.setState({
        selectValue: newValue.value
      });
      console.log(newValue.value)
    }
  }

  render () {
  	const options =  [
		    { value: 'chatswood', label: 'Chatswood' },
		    { value: 'hurstville', label: 'Hurstville' },
		    { value: 'kensington', label: 'Kensington' },
		    { value: 'randwick', label: 'Randwick' },
		    { value: 'townhall', label: 'Townhall' },
		    { value: 'epping', label: 'Epping' },
		    { value: 'roseberry', label: 'Roseberry' },
		    { value: 'hornsby', label: 'Hornsby' },
		  ];

    return (
     <Select 
        autofocus={true} 
        options={options}
        clearable={false} 
        value={this.state.selectValue} 
        onChange={this.updateValue} 
        searchable={this.state.searchable}
        noResultsText="No suburbs found..." 
        />
    )
  }

}

export default Autocomplete;