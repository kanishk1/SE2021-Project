import React, { Component } from 'react';
//import ReactMapGL from 'react-map-gl';
//import Scrollspy from 'react-scrollspy'
import '../css/App.css';


class Home extends Component {

  render () {
    return (
    
      <div>
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
  }

}

export default Home;