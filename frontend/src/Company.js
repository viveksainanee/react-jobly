import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {jobs:[]}
    }
  }

  async componentDidMount() { //error handling
    let response = await JoblyApi.getCompany(this.props.match.params.handle);
    this.setState({company: response})
  }

  render() {
    let jobCards = this.state.company.jobs.map(card=> <JobCard key={card.id} companyHandle={card.companyHandle} equity={card.equity} salary={card.salary} title={card.title}/>)
    return (
    
    <div>
      <h1>{this.state.company.name}</h1>
      <p>{this.state.company.description}</p>
      {jobCards}
    </div>
    
    );
  }
}

export default Company;
