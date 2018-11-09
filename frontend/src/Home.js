import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import backgroundImage from './images/3.jpg';

class Home extends Component {
  render() {
    if (this.props.currUser) {
      return <div>Hello. Welcome home, {this.props.currUser.first_name}.</div>;
    }
    // let styles = {
    //   backgroundImage: 'url(' + backgroundImage + ')',
    //   height: '100%',
    //   width: '100%',
    //   backgroundSize: 'cover',
    //   textAlign: 'center',
    //   opacity: '0.5'
    // };

    // let regularOpacityStyle = {
    //   opacity: '1.0'
    // };

    return (
      <div className="make100">
        <div className="home">
          <h1 id="home-h1">Jobly</h1>
          <h2>Connecting you to top companies</h2>
          <Link to="/login">
            <Button color="success">Get Started</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
