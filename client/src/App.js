import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/Movies/Movies';
import Customers from './components/Customers/Customers';
import Rentals from './components/Rentals/Rentals';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/Common/NotFound/NotFound';
import MovieForm from './components/Movies/MovieForm/MovieForm';
import LoginForm from './components/LoginForm/LoginForm';
import Logout from './components/Logout/Logout';
import RegisterForm from './components/RegisterForm/RegisterForm';
import ProtectedRoute from './components/Common/ProtectedRoute/ProtectedRoute';
import { getCurrentUser } from './services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {

  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user}/>
        <main className='container p-4'>
          <Switch>
            <Route path='/login' component={LoginForm}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/register' component={RegisterForm}/>
            <ProtectedRoute path='/movies/:id' component={MovieForm}/>
            <Route path='/movies' render={(props) => <Movies {...props} user={user}/>}/>
            <Route path='/customers' component={Customers}/>
            <Route path='/rentals' component={Rentals}/>
            <Route path='/not-found' component={NotFound}/>
            <Redirect from='/' exact to='/movies'/>
            <Redirect to='/not-found'/>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
