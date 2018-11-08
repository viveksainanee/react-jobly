import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import Alert from './Alert';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      errors: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault();
    } catch (err) {
      // set State this.state.errors = with new error
      this.setState(st => ({
        errors: [...st.errors, err]
      }));
    }
  }

  render() {
    let errorsAlerts = this.state.errors.map(err => (
      <Alert key={err} text={err} type="danger" />
    ));

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            id="username"
            onChange={this.handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            value={this.state.password}
            id="password"
            onChange={this.handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            id="email"
            onChange={this.handleChange}
          />

          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            id="firstName"
            onChange={this.handleChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            id="lastName"
            onChange={this.handleChange}
          />

          <button>Sign Up</button>
        </form>
        {this.state.errors.length > 0 ? errorsAlerts : null}
      </div>
    );
  }
}

export default SignupForm;
