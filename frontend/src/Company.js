import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCards from './JobCard';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {}
    }
  }

  async componentDidMount() {
    let response = await JoblyApi.request(`companies/${this.props.match.params.handle}`);
    console.log(response);
    this.setState({company: response.company})
  }

  render() {
    this.state.company.jobs.map(job=> <JobCard />)
    return (
    
    <div>
      <h3>{this.state.company.name}</h3>
      <p></p>
    </div>
    
    );
  }
}

export default Company;
