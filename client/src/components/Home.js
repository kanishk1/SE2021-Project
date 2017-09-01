import React, { Component } from 'react';
//import ReactMapGL from 'react-map-gl';
//import Scrollspy from 'react-scrollspy'
import '../css/App.css';


class Home extends Component {
  constructor() {
    super();
    this.state = {
        suburb: "",
        wikiData: {},
    };
  }
  //change query to be more specific
  async wikiApiCall(suburb) {
    const res = await fetch('/wiki?sub='+suburb)
    const data = await res.json();
    this.setState({
      wikiData: data 
    })
  }

  handleButtonClick = () => {
    this.wikiApiCall(this.state.suburb);
  }

  handleInputChange = e => {
    this.setState({
      suburb: e.target.value
    });
  }



  render () {
    return (
    
      <div>
<<<<<<< HEAD
      	<h2>Home</h2>
  	  </div>
  
		 /* <div>
		    <section id="section-1">section 1</section>
		    <section id="section-2">section 2</section>
		    <section id="section-3">section 3</section>
		  </div>
		  <Scrollspy items={ ['section-1', 'section-2', 'section-3'] } currentClassName="is-current">
		    <li><a href="#section-1">section 1</a></li>
		    <li><a href="#section-2">section 2</a></li>
		    <li><a href="#section-3">section 3</a></li>
		  </Scrollspy>
		
	<div className="map">
      <ReactMapGL
        width={400}
        height={400}
        latitude={37.7577}
        longitude={-122.4376}
        zoom={8}
        onViewportChange={(viewport) => {
          const {width, height, latitude, longitude, zoom} = viewport;
          // Optionally call `setState` and use the state to update the map.
        }}
      />
     </div>
    */
    );
=======
        <h2> HOME! </h2>
        To search, type with proper capitalisation and replace spaces with underscores.
        Also include state.
        E.g- For Kingsford, search "Kingsford,_New_South_Wales"
        <br></br>
        And have some patience
        <br></br>
        <input 
            type="text"
            placeholder="Enter suburb here"
            value={this.state.suburb}
            onChange={this.handleInputChange}/> 
        <br></br>
        <button autoFocus type="button" onClick={this.handleButtonClick}> Get Wiki Data </button>
        <br></br>
        <div><pre>{JSON.stringify(this.state.wikiData, null, 2)}</pre></div>
      </div>
    )
>>>>>>> d439fda1033764355960b21d68eb87af564efa73
  }

}

export default Home;