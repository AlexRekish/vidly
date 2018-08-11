import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Common/Pagination/Pagination';
import ListGroup from '../Common/ListGroup/ListGroup';
import MoviesTable from './MoviesTable/MoviesTable';

const movies = ({
    count,
    onDelete,
    onLike,
    onSort,
    itemCount,
    pageSize,
    onPageChanged,
    currentPage,
    movies,
    items,
    onItemSelect,
    selectedItem,
    sortColumn,
  }) => {
  return (
  <div className='row'>
    <div className="col-3">
      <ListGroup
        items={items}
        onItemSelect={onItemSelect}
        selectedItem={selectedItem}
        />
    </div>
    <div className='col'>
      {count}
      <MoviesTable
        sortColumn={sortColumn}
        movies={movies}
        onDelete={onDelete}
        onLike={onLike}
        onSort={onSort}
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
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
};

export default movies;
