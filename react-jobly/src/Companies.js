import React, { Component } from 'react';
import Search from './Search';
import CompanyCard from './CompanyCard';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCards: []
    };
  }

  updateCards(searchTerm) {
    // Making the AJAX call to search for companies matching search
  }

  render() {
    let companyCards = this.state.companyCards.map(card => <CompanyCard />);
    return (
      <div>
        Hello. Welcome to Companies, Silos.
        <Search />
        {companyCards}
      </div>
    );
  }
}

export default Companies;
