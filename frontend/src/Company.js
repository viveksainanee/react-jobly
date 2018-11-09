import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import Alert from './Alert';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: { jobs: [] },
      myApps: [],
      errors: []
    };
  }

  async componentDidMount() {
    //error handling
    try {
      let response = await JoblyApi.getCompany(this.props.match.params.handle);

      let myApps = await JoblyApi.myJobApplications(
        this.props.currUser.username
      );

      this.setState({ company: response, myApps });
    } catch (err) {
      // set State this.state.errors = with new error
      this.setState(st => ({
        errors: [...st.errors, err]
      }));
    }
  }

  render() {
    let jobIDs = new Set();
    for (let i = 0; i < this.state.myApps.length; i++) {
      jobIDs.add(this.state.myApps[i].job_id);
    }
    console.log(jobIDs);

    let jobCards = this.state.company.jobs.map(card => {
      //if this card ID is in this.state.myApps, state should be 'applied'
      let state;

      if (jobIDs.has(card.id)) {
        state = 'applied';
      }

      return (
        <JobCard
          key={card.id}
          id={card.id}
          companyHandle={card.companyHandle}
          equity={card.equity}
          salary={card.salary}
          title={card.title}
          currUser={this.props.currUser}
          state={state}
        />
      );
    });

    let errorsAlerts = this.state.errors.map(err => (
      <Alert key={err} text={err} type="danger" />
    ));

    // if theres stuff in err Array, then return alert
    if (this.state.errors.length > 0) {
      return <div>{errorsAlerts}</div>;
    }

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
