import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import Alert from './Alert';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',

      password: '',
      firstName: '',
      lastName: '',
      email: '',
      errors: [],
      activeForm: 'login'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeToLogin = this.changeToLogin.bind(this);
    this.changeToSignup = this.changeToSignup.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  changeToLogin() {
    this.setState({
      errors: [],
      activeForm: 'login'
    });
  }

  changeToSignup() {
    this.setState({
      errors: [],
      activeForm: 'signup'
    });
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault();

      // The if side of this handles a successful login
      if (this.state.activeForm === 'login') {
        let token = await JoblyApi.login(
          this.state.username,
          this.state.password
        );
        localStorage.setItem('token', token);
        console.log('LOGGED IN SUCCESSFULLY');
        this.setState({ username: '', password: '' });
        await this.props.handleLogin();
        this.props.history.push('/jobs');

        // The else side of this handles a successful registrations
      } else {
        let token = await JoblyApi.register(
          this.state.username,
          this.state.password,
          this.state.email,
          this.state.firstName,
          this.state.lastName
        );

        //put token in local storage
        localStorage.setItem('token', token);

        this.setState({
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: ''
        });
        console.log('SIGNUP  SUCCESSFULLY');
      }
    } catch (err) {
      // set State this.state.errors = with new error
      this.setState(st => ({
        errors: [err]
      }));
    }
  }

  render() {
    let errorsAlerts = this.state.errors.map(err => (
      <Alert key={err} text={err} type="danger" />
    ));

    let loginInputs = ['username', 'password'];
    let signupInputs = [
      'username',
      'password',
      'email',
      'firstName',
      'lastName'
    ];

    let inputs;

    if (this.state.activeForm === 'login') {
      inputs = loginInputs.map(input => (
        <div>
          <label htmlFor={input}>{input}</label>
          <input
            type="text"
            name={input}
            value={this.state[input]}
            id={input}
            onChange={this.handleChange}
          />
        </div>
      ));
    } else {
      inputs = signupInputs.map(input => (
        <div>
          <label htmlFor={input}>{input}</label>
          <input
            type="text"
            name={input}
            value={this.state[input]}
            id={input}
            onChange={this.handleChange}
          />
        </div>
      ));
    }

    return (
      <div>
        <button onClick={this.changeToLogin}>Login </button>
        <button onClick={this.changeToSignup}> Signup </button>
        <form onSubmit={this.handleSubmit}>
          {inputs}

          <button>Submit</button>
        </form>
        {this.state.errors.length > 0 ? errorsAlerts : null}
      </div>
    );
  }
}

export default Login;
