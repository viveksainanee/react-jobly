import React, { Component } from 'react';
import Routes from './Routes';
import Nav from './Nav';

class App extends Component {
  static defaultProps = {
    navlinks: ['companies', 'jobs', 'profile', 'login']
  };

  render() {
    return (
      <div>
        <Nav navlinks={this.props.navlinks} />
        <Routes />
      </div>
    );
  }
}

export default App;
