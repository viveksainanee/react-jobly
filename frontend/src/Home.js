import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Home extends Component {
  render() {
    if (this.props.currUser) {
      return <div>Hello. Welcome home, {this.props.currUser.first_name}.</div>;
    }
    return <Link to='/login'><Button color='success'>Get Started</Button></Link>;
  }
}

export default Home;
