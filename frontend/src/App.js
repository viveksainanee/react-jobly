import React, { Component } from 'react';
import Routes from './Routes';
import NavBar from './NavBar';

class App extends Component {
  static defaultProps = {
    navlinks: ['companies', 'jobs', 'profile', 'login']
  };

  render() {
    return (
      <div>
        <NavBar navlinks={this.props.navlinks} />
        <Routes />
      </div>
    );
  }
}

export default App;
