import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { getMovies } from './services/fakeMovieService';
import Movies from './components/Movies/Movies';
import paginate from './utils/paginate';

const movies = getMovies().map(movie => {
  return { ...movie, liked: false };
});

class App extends Component {
  state = {
    movies,
    pageSize: 4,
    currentPage: 1,
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

  pageChangeHandler = (page) => {
    this.setState({ currentPage: page });
  }

  checkNumberOfMovies = () => {
    if (!this.state.movies.length) return <p>There are no movies in the database</p>;
    return <p>Showing {this.state.movies.length} movies in the database</p>;
  };

  render() {
    const { movies: allMovies, pageSize, currentPage } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <main className="container">
        <Movies
          count={this.checkNumberOfMovies()}
          movies={movies}
          deleteMovie={this.deleteMovieHandler}
          onLike={this.likeMovieHandler}
          itemCount={allMovies.length}
          pageSize={pageSize}
          onPageChanged={this.pageChangeHandler}
          currentPage={currentPage}
        />
      </main>
    );
  }
}

export default App;
