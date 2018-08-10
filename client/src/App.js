import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { getMovies } from './services/fakeMovieService';
import Movies from './components/Movies/Movies';

const movies = getMovies().map(movie => {
  return { ...movie, liked: false };
});

class App extends Component {
  state = {
    movies,
    pageSize: 4
  }
  deleteMovieHandler = (id) => {
    const updatedMovies = this.state.movies.slice();
    const index = updatedMovies.findIndex(movie => movie._id === id);
    updatedMovies.splice(index, 1);
    this.setState({ movies: updatedMovies });
  }

  likeMovieHandler = (id) => {
    const updatedMovies = this.state.movies.slice();
    const index = updatedMovies.findIndex(movie => movie._id === id);
    updatedMovies[index].liked = !updatedMovies[index].liked;
    this.setState({ movies: updatedMovies });
  }

  pageChangeHadler = () => {
    console.log('Page changed');
  }

  checkNumberOfMovies = () => {
    if (!this.state.movies.length) return <p>There are no movies in the database</p>;
    return <p>Showing {this.state.movies.length} movies in the database</p>;
  };

  render() {
    const { movies, pageSize } = this.state;
    return (
      <main className="container">
        <Movies
          count={this.checkNumberOfMovies()}
          movies={movies}
          deleteMovie={this.deleteMovieHandler}
          onLike={this.likeMovieHandler}
          itemCount={movies.length}
          pageSize={pageSize}
          onPageChanged={this.pageChangeHadler}
        />
      </main>
    );
  }
}

export default App;
