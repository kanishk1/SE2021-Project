import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import general from '../img/general.png';
import investor from '../img/investor.png';
import researcher from '../img/researcher.png';


class ProfileSelection extends Component {
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
      console.log(newValue)
    }
  }

  render () {
    return (
    <Grid>
      <Row>
        <Col xs={6} md={4}>
          <Thumbnail src={investor} alt="242x200" onClick={() => this.updateValue("Investor")}>
            <h2>Investor</h2>
          </Thumbnail>
        </Col>
        <Col xs={6} md={4}>
          <Thumbnail src={general} alt="242x200" onClick={() => this.updateValue("General")}>
            <h2>General User</h2>
          </Thumbnail>
        </Col>
        <Col xs={6} md={4}>
          <Thumbnail src={researcher} alt="242x200" onClick={() => this.updateValue("Researcher")}>
            <h2>Researcher</h2>
          </Thumbnail>
        </Col>
      </Row>
    </Grid>
    )
  }

}

export default ProfileSelection;