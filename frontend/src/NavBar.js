import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import uuid from 'uuid/v4';
import './Nav.css';

//Top navigation used everywhere on app/site
class NavBar extends Component {
  render() {
    let navLinks = this.props.currUser
      ? ['companies', 'jobs', 'profile', 'logout']
      : ['login'];

    //This dynamically creates nav links based on props
    let navLinkComponents = navLinks.map(navLink => {
      if (navLink === 'logout') {
        return (
          <li key={uuid()}>
            <NavLink onClick={this.props.handleLogout} to="/login">
              logout
            </NavLink>
          </li>
        );
      }
      return (
        <li key={navLink}>
          <NavLink to={`/${navLink}`}>{navLink}</NavLink>
        </li>
      );
    });

    return (
      <div>
        <ul>
          <li>
            <NavLink exact to="/">
              Jobly
            </NavLink>
          </li>
          {navLinkComponents}
        </ul>
      </div>
    );
  }
}

export default NavBar;
