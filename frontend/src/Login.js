import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import Alert from './Alert';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
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
        this.setState({ username: '', password: '' });
        await this.props.handleLogin();
        this.props.history.push('/jobs');

        // The else side of this handles a successful registrations
      } else {
        let token = await JoblyApi.register(
          this.state.username,
          this.state.password,
          this.state.email,
          this.state.first_name,
          this.state.last_name
        );

        //put token in local storage
        localStorage.setItem('token', token);

        this.setState({
          username: '',
          password: '',
          first_name: '',
          last_name: '',
          email: ''
        });
        await this.props.handleLogin();
        this.props.history.push('/jobs');
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

    let loginInputs = [
      {
        label: 'Username',
        inputName: 'username',
        type: 'text',
        value: this.state.username
      },
      {
        label: 'Password',
        inputName: 'password',
        type: 'password',
        value: this.state.password
      }
    ];

    let signupInputs = [
      {
        label: 'Username',
        inputName: 'username',
        type: 'text',
        value: this.state.username
      },
      {
        label: 'Password',
        inputName: 'password',
        type: 'password',
        value: this.state.password
      },
      {
        label: 'Email',
        inputName: 'email',
        type: 'text',
        value: this.state.email
      },
      {
        label: 'First Name',
        inputName: 'first_name',
        type: 'text',
        value: this.state.first_name
      },
      {
        label: 'Last Name',
        inputName: 'last_name',
        type: 'text',
        value: this.state.last_name
      }
    ];

    let inputs;

    if (this.state.activeForm === 'login') {
      inputs = loginInputs.map(input => (
        <div>
          <label htmlFor={input.inputName}>{input.label}</label>
          <input
            type={input.type}
            name={input.inputName}
            value={this.state[input.inputName]}
            id={input.inputName}
            onChange={this.handleChange}
          />
        </div>
      ));
    } else {
      inputs = signupInputs.map(input => (
        <div>
          <label htmlFor={input.inputName}>{input.label}</label>
          <input
            type={input.type}
            name={input.inputName}
            value={this.state[input.inputName]}
            id={input.inputName}
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
