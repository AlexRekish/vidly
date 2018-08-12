import React from 'react';
import Joi from 'joi-browser';
import Form from '../Common/Form/Form';

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
      .min(3)
      .max(50)
      .email()
      .required()
      .label('Username'),
    password: Joi.string()
      .min(5)
      .max(30)
      .required()
      .label('Password'),
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label('Name')
  };

  onSubmitted = () => {
    console.log('registered')
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
