import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import Alert from './Alert';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: { jobs: [] },
      errors: []
    };
  }

  async componentDidMount() {
    //error handling
    try {
      if (this.props.currUser) {
        let response = await JoblyApi.getCompany(
          this.props.match.params.handle
        );
        this.setState({ company: response });
      } else {
        throw 'Unauthorized';
      }
    } catch (err) {
      // set State this.state.errors = with new error
      this.setState(st => ({
        errors: [...st.errors, err]
      }));
    }
  }

  render() {
    let jobCards = this.state.company.jobs.map(card => (
      <JobCard
        key={card.id}
        id={card.id}
        companyHandle={card.companyHandle}
        equity={card.equity}
        salary={card.salary}
        title={card.title}
        currUser={this.props.currUser}
        state={card.state}
      />
    ));

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
