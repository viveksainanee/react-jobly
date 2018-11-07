import React, { Component } from 'react';
import Search from './Search';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';

//This renders the job page with job cards 
class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobCards: []
    };
    this.updateCards = this.updateCards.bind(this);
  }

  //Gets results from database and updates jobCards state
  async updateCards(searchTerm) {
    // Making the AJAX call to search for companies matching search
    let response = await JoblyApi.request(`jobs?search=${searchTerm}`);
    console.log(response);
    this.setState(st => ({jobCards: response.jobs}));
  }

  render() {
    let jobCards = this.state.jobCards.map(card => <JobCard key={card.id} companyHandle={card.companyHandle} equity={card.equity} salary={card.salary} title={card.title}/>)
    return <div>
      <Search updateCards={this.updateCards}/>
      {jobCards}
    </div>;
  }
}

export default Jobs;

