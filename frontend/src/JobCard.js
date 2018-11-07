import React, { Component } from 'react';

//Shows basic info on card used on company page and jobs page
class JobCard extends Component {
  render() {
    return (
    <div>
      <h3>{this.props.title}</h3>
      <p>Salary: {this.props.salary}</p>
      <p>Equity: {this.props.equity}</p>
    </div>
    )
  }
}

export default JobCard;
