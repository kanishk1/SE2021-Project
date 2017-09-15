import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';





class Demographics extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async photos(query) {
    const response = await fetch('/wiki?sub='+query);
    const data = await response.json();
    console.log(data);
  }

  render() {
    //{this.photos('Hurstville,_New_South_Wales')}
    return (
      <Grid>
        <Col lg={7}>
          <Row>
            <h1> <strong>Demographics</strong> </h1>
          </Row>
          <Row className="summary">
            <p>
              <strong>Demographics summary goes here.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Row>
          <Row className="chartsOne">
            <h1> Charts here </h1>
          </Row>
        </Col>  
        <Col lg={5}>
          <Row>
            <h1> Photos here. Function is ready, have to pick an api </h1>
          </Row>
          <Row className="chartsTwo">
            <h1> MOAR charts here </h1>
          </Row>  
        </Col>  
      </Grid>
    )
  }

} 

export default Demographics;