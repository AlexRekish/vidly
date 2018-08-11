import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { getMovies } from './services/fakeMovieService';
import { getGenres } from './services/fakeGenreService';
import Movies from './components/Movies/Movies';
import paginate from './utils/paginate';
import _ from 'lodash';

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
    sortColumn: {
      path: 'title',
      order: 'asc',
    }
  }

  componentDidMount() {
    this.setState({
      movies,
      genres: [{ _id: '', name: 'All genres'}, ...getGenres()],
    });
  }

  deleteMovieHandler = (movie) => {
    const updatedMovies = this.state.movies.slice();
    const index = updatedMovies.findIndex(m => movie._id === m._id);
    updatedMovies.splice(index, 1);
    this.setState({ movies: updatedMovies });
  }

  likeMovieHandler = (movie) => {
    const updatedMovies = this.state.movies.slice();
    const index = updatedMovies.findIndex(m => movie._id === m._id);
    updatedMovies[index].liked = !updatedMovies[index].liked;
    this.setState({ movies: updatedMovies });
  }

  sortMovieHandler = (sortColumn) => {
    this.setState({ sortColumn })
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

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
    } = this.state;
    const filtered = selectedGenre && selectedGenre._id ?
      allMovies.filter(movie => selectedGenre._id === movie.genre._id) :
      allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies }
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    const { totalCount, data: movies} = this.getPagedData();

    return (
      <main className='container'>
        <Movies
          count={this.checkNumberOfMovies(totalCount)}
          movies={movies}
          onDelete={this.deleteMovieHandler}
          onLike={this.likeMovieHandler}
          onSort={this.sortMovieHandler}
          itemCount={totalCount}
          pageSize={pageSize}
          onPageChanged={this.pageChangeHandler}
          currentPage={currentPage}
          items={genres}
          onItemSelect={this.genreSelectHandler}
          selectedItem={selectedGenre}
          sortColumn={sortColumn}
        />
      </main>
    );
  }
}

export default App;
