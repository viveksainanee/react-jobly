import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Company cards are rendered on Companies page and give basic info on companies
class CompanyCard extends Component {
  render() {
    return (
      <Link to={`/companies/${this.props.handle}`}>
        <div>
          <h3>{this.props.name}</h3>
          <p>{this.props.description}</p>
          <img src={this.props.logoUrl} alt={this.props.name} />
        </div>
      </Link>
    );
  }
}

export default CompanyCard;
