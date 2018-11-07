import React, { Component } from 'react';
import Search from './Search';
import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyApi';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCards: []
    };
    this.updateCards = this.updateCards.bind(this);
  }

  async updateCards(searchTerm) {
    // Making the AJAX call to search for companies matching search
    let cards = await JoblyApi.request(`companies?search=${searchTerm}`);
    console.log(cards);
  }

  render() {
    let companyCards = this.state.companyCards.map(card => <CompanyCard />);
    return (
      <div>
        Hello. Welcome to Companies, Silos.
        <Search updateCards={this.updateCards} />
        {companyCards}
      </div>
    );
  }
}

export default Companies;
