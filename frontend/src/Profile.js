import React, { Component } from 'react';
import Alert from './Alert';
import JoblyApi from './JoblyApi';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      user: {
        first_name: '',
        last_name: '',
        email: '',
        photo_url: '',
        password: ''
      }, 
      isLoading: true, 
      updateSuccessful: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      user: {
        ...this.state.user,
        [evt.target.name]: evt.target.value
      }
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      let photo_url = this.state.user.photo_url
        ? this.state.user.photo_url
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg';

      let user = await JoblyApi.patchUser({ ...this.state.user, photo_url });
      user.password = '';
      this.setState({ user, updateSuccessful: true, errors: [] });
    } catch (err) {
      console.log(err);
      this.setState({ errors: err, updateSuccessful: false });
    }
  }

  async componentDidMount() {
    try {
      let user = this.props.currUser;
      user.password = '';

      user.photo_url = user.photo_url
        ? user.photo_url
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg';

      this.setState({ user, isLoading: false, errors: [], updateSuccessful: false });
    } catch (err) {
      console.log(err);
      this.setState({ errors: err, updateSuccessful: false });
    }
  }

  render() {
    let profileInputs = [
      {
        label: 'First Name',
        inputName: 'first_name',
        type: 'text',
        value: this.state.user.first_name
      },
      {
        label: 'Last Name',
        inputName: 'last_name',
        type: 'text',
        value: this.state.user.last_name
      },
      {
        label: 'Email',
        inputName: 'email',
        type: 'email',
        value: this.state.user.email
      },
      {
        label: 'Photo URL',
        inputName: 'photo_url',
        type: 'text',
        value: this.state.user.photo_url
      },
      {
        label: 'Re-type Password',
        inputName: 'password',
        type: 'password',
        value: this.state.user.password
      }
    ];

    let inputElements = profileInputs.map(input => (
      <div key={input.inputName}>
        <label htmlFor={input.inputName}>{input.label}</label>
        <input
          type={input.type}
          name={input.inputName}
          id={input.inputName}
          onChange={this.handleChange}
          value={input.value}
        />
      </div>
    ));

    let errorsAlerts = this.state.errors.map(error => (
      <Alert key={error} text={error} type="danger" />
    ));

    if(this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <div>Username: {this.props.currUser.username}</div>
        <form onSubmit={this.handleSubmit}>
          {inputElements}

          <button>Submit</button>
        </form>
        {this.state.errors.length > 0 ? errorsAlerts : null}
        {this.state.updateSuccessful ? <Alert key='updateSuccessful' text='Profile Updated' type='success' /> : null}
      </div>
    );
  }
}

export default Profile;
