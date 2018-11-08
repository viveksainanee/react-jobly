import React, { Component } from 'react';
import Alert from './Alert';
import JoblyApi from './JoblyApi';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  async componentDidMount() {
    try {
      await this.props.handleRefresh(); //await
      let user = await JoblyApi.getUser(this.props.currUser);
      console.log(user);
      this.setState({ user });
    } catch (err) {
      this.setState(st => ({errors: [...st.errors]}));
    }
  }

  render() {
    let profileInputs = [
      {
        label: 'First Name',
        inputName: 'firstName',
        type: 'text',
        placeholder: ''
      },
      {
        label: 'Last Name',
        inputName: 'lastName',
        type: 'text'
      },
      {
        label: 'Email',
        inputName: 'email',
        type: 'email'
      },
      {
        label: 'Image URL',
        inputName: 'imageUrl',
        type: 'text'
      },
      {
        label: 'Password',
        inputName: 'password',
        type: 'password'
      }
    ];

    let inputElements = profileInputs.map(input => (
      <div>
        <label htmlFor={input.inputName}>{input.label}</label>
        <input
          type="text"
          name={input.inputName}
          value={this.state[input.inputName]}
          id={input.inputName}
          onChange={this.handleChange}
        />
      </div>
    ));

    let errorsAlerts = this.state.errors.map(error => (
      <Alert key={error} text={error} type="danger" />
    ));

    if (errorsAlerts.length) {
      return <div>{errorsAlerts}</div>;
    }

    return (
      <div>
        <div>Username: {this.props.currUser}</div>
        <form onSubmit={this.handleSubmit}>
          {inputElements}

          <button>Submit</button>
        </form>
        {this.state.errors.length > 0 ? errorsAlerts : null}
      </div>
    );
  }
}

export default Profile;
