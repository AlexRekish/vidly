import React from 'react';
import Movie from './Movie/Movie';

const moviesTable = (props) => {
  const { movies, onDelete, onLike } = props;
  return (
    <table className='table'>
      <tbody>
        {movies.map(movie => (
          <Movie
            movie={movie}
            key={movie._id}
            onDelete={() => onDelete(movie._id)}
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
    </table>);
}

export default moviesTable;
