import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import Pagination from '../Common/Pagination/Pagination';
import ListGroup from '../Common/ListGroup/ListGroup';
import MoviesTable from './MoviesTable/MoviesTable';
import SearchBox from './../Common/SearchBox/SearchBox';
import { getMovies, deleteMovie } from '../../services/movieService';
import { getGenres } from '../../services/genreService';
import paginate from '../../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: '',
    pageSize: 4,
    currentPage: 1,
    searchString: '',
    sortColumn: {
      path: 'title',
      order: 'asc',
    }
  }

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres: [{ _id: '', name: 'All genres'}, ...genres],
    });
  }

  deleteMovieHandler = async (movie) => {
    const oldMovies = [...this.state.movies];
    const updatedMovies = oldMovies.filter(m => movie._id !== m._id);
    this.setState({ movies: updatedMovies });

    try {
      await deleteMovie(movie._id);
    } catch (err) {
      if (err.response && err.response.status === 404) toast.error('Movie already deleted!');
      this.setState({ movies: oldMovies });
    }
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
    this.setState({ selectedGenre: genre, currentPage: 1, searchString: ''});
  }

  searchHandler = (query) => {
    this.setState({ selectedGenre: '', searchString: query, currentPage: 1 })
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
      searchString,
    } = this.state;
    let filtered;
    if (searchString) {
      const reg = new RegExp(`^${searchString}`,'i');
      filtered = allMovies.filter(movie => reg.test(movie.title));
    } else {
      filtered = selectedGenre && selectedGenre._id ?
      allMovies.filter(movie => selectedGenre._id === movie.genre._id) :
      allMovies;
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, movies }
  };
  render() {
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchString,
    } = this.state;

    const { totalCount, movies } = this.getPagedData();
    return (
      <div className='row'>
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.genreSelectHandler}
            selectedItem={selectedGenre}
            />
        </div>
        <div className='col'>
          {this.props.user && <Link
            to='/movies/new'
            className='btn btn-primary'
            style={{marginBottom: '10px'}}
          >
            New movie
          </Link>}
          <SearchBox
            value={searchString}
            onChange={this.searchHandler}
          />
          {this.checkNumberOfMovies(totalCount)}
          <MoviesTable
            sortColumn={sortColumn}
            movies={movies}
            onDelete={this.deleteMovieHandler}
            onLike={this.likeMovieHandler}
            onSort={this.sortMovieHandler}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            onPageChanged={this.pageChangeHandler}
            currentPage={currentPage}
            />
        </div>
      </div>);
  }
}

export default Movies;
