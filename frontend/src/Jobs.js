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

  async componentDidMount() {
    let response = await JoblyApi.getJobs(''); 
    this.setState({ jobCards: response });
  }


  //Gets results from database and updates jobCards state
  async updateCards(searchTerm) {
    // Making the AJAX call to search for companies matching search
    let response = await JoblyApi.getJobs(searchTerm); 
    console.log(response);
    this.setState({ jobCards: response });
  }

  render() {
    let jobCards = this.state.jobCards.map(card => (
      <JobCard
        key={card.id}
        companyHandle={card.companyHandle}
        equity={card.equity}
        salary={card.salary}
        title={card.title}
      />
    ));
    return (
      <div>
        <Search updateCards={this.updateCards} />
        {jobCards}
      </div>
    );
  }
}

export default Jobs;
