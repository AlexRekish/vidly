import React from 'react';
import Joi from 'joi-browser';
import Form from '../Common/Form/Form';
import { register } from '../../services/usersService';
import { loginWithJwt } from './../../services/authService';

class RegisterForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
      name: ''
    },
    errors: {},
  }

  schema = {
    username: Joi.string()
      .min(5)
      .max(50)
      .email()
      .required()
      .label('Username'),
    password: Joi.string()
      .min(10)
      .max(30)
      .required()
      .label('Password'),
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label('Name')
  };

  onSubmitted = async () => {
    try {
      const res = await register(this.state.data);
      loginWithJwt(res);
      window.location = '/';
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.formSubmitHandler}>
          {this.renderInput('username', 'Username', 'Enter email')}
          {this.renderInput('password', 'Password', 'Password', 'password')}
          {this.renderInput('name', 'Name', 'Enter Name')}
          {this.renderSubmitButton('Register')}
        </form>
      </div>
     );
  }
}

export default RegisterForm;
