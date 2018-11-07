import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
  render() {
    let links = this.props.navlinks.map(navlink => (
      <li key={navlink}>
        <NavLink to={`/${navlink}`}>{navlink}</NavLink>
      </li>
    ));

    return (
      <div>
        <ul>
          <li>
            <NavLink exact to="/">
              Jobly
            </NavLink>
          </li>
          {links}
        </ul>
      </div>
    );
  }
}

export default Nav;
