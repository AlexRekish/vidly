import React from 'react';
import Joi from 'joi-browser';
import Form from '../Common/Form/Form';
import { login } from '../../services/authService';
import { getCurrentUser } from './../../services/authService';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {}
  }

  schema = {
    username: Joi.string().min(5).max(30).required().label('Username'),
    password: Joi.string().min(10).max(30).required().label('Password'),
  }

  onSubmitted = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    if (getCurrentUser()) return <Redirect to='/'/>
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.formSubmitHandler}>
          {this.renderInput('username', 'Username', 'Enter username')}
          {this.renderInput('password', 'Password', 'Password', 'password')}
          {this.renderSubmitButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
