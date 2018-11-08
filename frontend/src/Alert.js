import React, { Component } from 'react';

//Alert gonna be reused everywehre
class Alert extends Component {
  render() {
    return <div className={`${this.props.type} alert`}>{this.props.text}</div>;
  }
}

export default Alert;
