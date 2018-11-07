import React, { Component } from 'react';
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
