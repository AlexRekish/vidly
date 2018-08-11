import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { getMovies } from './services/fakeMovieService';
import { getGenres } from './services/fakeGenreService';
import Movies from './components/Movies/Movies';
import paginate from './utils/paginate';

const movies = getMovies().map(movie => {
  return { ...movie, liked: false };
});

class App extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: '',
    pageSize: 4,
    currentPage: 1,
  }

  componentDidMount() {
    this.setState({
      movies,
      genres: [{ name: 'All genres'}, ...getGenres()],
    });
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

  genreSelectHandler = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1});
  }

  checkNumberOfMovies = (number) => {
    if (!number) return <p>There are no movies in the database</p>;
    return <p>Showing {number} movies in the database</p>;
  };

  render() {
    const { movies: allMovies, pageSize, currentPage, genres, selectedGenre } = this.state;
    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(movie => selectedGenre._id === movie.genre._id)
      : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <main className='container'>
        <Movies
          count={this.checkNumberOfMovies(filtered.length)}
          movies={movies}
          deleteMovie={this.deleteMovieHandler}
          onLike={this.likeMovieHandler}
          itemCount={filtered.length}
          pageSize={pageSize}
          onPageChanged={this.pageChangeHandler}
          currentPage={currentPage}
          items={genres}
          onItemSelect={this.genreSelectHandler}
          selectedItem={selectedGenre}
        />
      </main>
    );
  }
}

export default App;
