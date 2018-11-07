import React, { Component } from 'react';
import Search from './Search';
import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyApi';
import logoDefaultUrl from './company-logo.png';

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
    let response = await JoblyApi.request(`companies?search=${searchTerm}`);
    console.log(response.companies);
    this.setState(st => ({companyCards: response.companies}));
  }

  render() {
    let companyCards = this.state.companyCards.map(card => <CompanyCard key={card.handle} name={card.name} description={card.description} logoUrl={card.logo_url || logoDefaultUrl} handle={card.handle} />);
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
