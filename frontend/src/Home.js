import React, { Component } from 'react';

class Home extends Component {

  componentDidMount() {
    this.props.handleRefresh();

  }

  render() {
    return <div>Hello. Welcome home, son.</div>;
  }
}

export default Home;
