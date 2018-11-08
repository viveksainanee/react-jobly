import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

//Top navigation used everywhere on app/site 
class NavBar extends Component {
  render() {
    //This dynamically creates nav links based on props
    let links = this.props.navlinks.map(navlink => (
      <li key={navlink}>
        <NavLink to={`/${navlink}`}>{navlink}</NavLink>
      </li>
    ));//refactor

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

export default NavBar;
