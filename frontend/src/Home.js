import React, { Component } from 'react';

class Home extends Component {
  render() {
    if (this.props.currUser) {
      return <div>Hello. Welcome home, son.</div>;
    }
    return <div>Go login </div>;
  }
}

export default Home;
