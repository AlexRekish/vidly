import React from "react";
import PropTypes from 'prop-types';
import Movie from "./Movie/Movie";
import Pagination from '../Common/Pagination/Pagination';

const movies = props => {
  const {count, deleteMovie, onLike, itemCount, pageSize, onPageChanged, currentPage, movies} = props;
  return (
  <React.Fragment>
    {count}
    <table className="table">
      <tbody>
        {movies.map(movie => (
          <Movie
            movie={movie}
            key={movie._id}
            delete={() => deleteMovie(movie._id)}
            onLike={() => onLike(movie._id)}
            liked={movie.liked}
          />
        ))}
      </tbody>
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th/>
          <th/>
        </tr>
      </thead>
    </table>
    <Pagination
      itemCount={itemCount}
      pageSize={pageSize}
      onPageChanged={onPageChanged}
      currentPage={currentPage}
    />
  </React.Fragment>)
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
