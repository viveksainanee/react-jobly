import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Jobs from './Jobs';
import Profile from './Profile';
import Login from './Login';
import Company from './Company';

//Creates routes for for all crucial jobly pages
class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/companies" render={() => <Companies />} />
          <Route exact path="/companies/:handle" render={(props) => <Company {...props} />} />
          <Route exact path="/jobs" render={() => <Jobs />} />
          <Route exact path="/profile" render={() => <Profile />} />
          <Route exact path="/login" render={() => <Login  handleLogin={this.props.handleLogin}/>} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default Routes;
