import React from 'react';
import Joi from 'joi-browser';
import Form from '../Common/Form/Form';

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {}
  }

  schema = {
    username: Joi.string().min(3).max(30).required().label('Username'),
    password: Joi.string().min(10).max(30).required().label('Password'),
  }

  onSubmitted = () => {
    console.log('submitted');
  }

  render() {
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
