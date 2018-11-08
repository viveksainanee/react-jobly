import React, { Component } from 'react';
import Search from './Search';
import JoblyApi from './JoblyApi';
import Alert from './Alert';
import JobCard from './JobCard';

//This renders the job page with job cards
class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobCards: [],
      errors: []
    };
    this.updateCards = this.updateCards.bind(this);
  }

  async componentDidMount() {
    try {
      this.props.handleRefresh();
      if (this.props.currUser) {
      let response = await JoblyApi.getJobs('');
      this.setState({ jobCards: response });
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

  //Gets results from database and updates jobCards state
  async updateCards(searchTerm) {
    try {
      // Making the AJAX call to search for companies matching search
      let response = await JoblyApi.getJobs(searchTerm);
      console.log(response);
      this.setState({ jobCards: response });
    } catch (err) {
      // set State this.state.errors = with new error
      this.setState(st => ({
        errors: [...st.errors, err]
      }));
    }
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
    let errorsAlerts = this.state.errors.map(err => (
      <Alert key={err} text={err} type="danger" />
    ));

    // if theres stuff in err Array, then return alert
    if (this.state.errors.length > 0) {
      return <div>{errorsAlerts}</div>;
    }

    return (
      <div>
        <Search updateCards={this.updateCards} />
        {jobCards}
      </div>
    );
  }
}

export default Jobs;
