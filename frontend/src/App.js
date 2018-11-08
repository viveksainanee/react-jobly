import React, { Component } from 'react';
import Routes from './Routes';
import NavBar from './NavBar';
import jwt from 'jsonwebtoken';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: null
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh() {
    let token = localStorage.getItem('token');
    let currUser = jwt.decode(token);
    let username = currUser ? currUser.username : null;
    this.setState({ currUser: username });
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({ currUser: null });
  }

  handleLogin() {
    let token = localStorage.getItem('token');
    let currUser = jwt.decode(token);
    this.setState({ currUser: currUser.username });
  }

  render() {
    return (
      <div>
        <NavBar
          currUser={this.state.currUser}
          navlinks={this.props.navlinks}
          handleLogout={this.handleLogout}
        />
        <Routes handleRefresh={this.handleRefresh} currUser={this.state.currUser} handleLogin={this.handleLogin} />
      </div>
    );
  }
}

export default App;