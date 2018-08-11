import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Common/Pagination/Pagination';
import ListGroup from '../Common/ListGroup/ListGroup';
import MoviesTable from './MoviesTable/MoviesTable';

const movies = props => {
  const {count, deleteMovie, onLike, itemCount, pageSize, onPageChanged, currentPage, movies} = props;
  return (
  <div className='row'>
    <div className="col-3">
      <ListGroup
        items={props.items}
        onItemSelect={props.onItemSelect}
        selectedItem={props.selectedItem}
      />
    </div>
    <div className='col'>
      {count}
      <MoviesTable
        movies={movies}
        onDelete={deleteMovie}
        onLike={onLike}
      />
      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        />
    </div>
  </div>)
};

movies.propTypes = {
  count: PropTypes.node,
  deleteMovie: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
};

export default movies;
