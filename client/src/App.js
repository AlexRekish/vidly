import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { getMovies } from './services/fakeMovieService';
import Movies from './components/Movies/Movies';

const movies = getMovies();

class App extends Component {
  state = {
    movies
  }
  deleteMovieHandler = (id) => {
    const updatedMovies = [...this.state.movies];
    const index = updatedMovies.findIndex(movie => movie._id === id);
    updatedMovies.splice(index, 1);
    this.setState({ movies: updatedMovies });
  }

  checkNumberMovies = () => {
    if (!this.state.movies.length) return <p>There are no movies in the database</p>;
    return <p>Showing {this.state.movies.length} movies in the database</p>;
  };

  render() {
    return (
      <main className="container">
        {this.checkNumberMovies()}
        <Movies
          movies={this.state.movies}
          deleteMovie={this.deleteMovieHandler}
        />
      </main>
    );
  }
}

export default App;
