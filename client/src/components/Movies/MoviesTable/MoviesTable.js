import React from 'react';
import Like from '../../Common/Like/Like';
import Table from '../../Common/Table/Table';

const moviesTable = ({ movies, onDelete, onLike, onSort, sortColumn }) => {
  const columns = [
    { path: 'title', label: 'Title'},
    { path: 'genre.name', label: 'Genre'},
    { path: 'numberInStock', label: 'Stock'},
    { path: 'dailyRentalRate', label: 'Rate'},
    {
      key: 'like',
      content: movie => (
        <Like
          onLike={() => onLike(movie)}
          liked={movie.liked}
      />)
    },
    {
      key: 'delete',
      content: movie => (
        <button
          onClick={() => onDelete(movie)}
          className='btn btn-danger btn-sm'
        >
          Delete
        </button>
      )
    },
  ]
  return (
    <Table
      data={movies}
      onSort={onSort}
      sortColumn={sortColumn}
      columns={columns}
    />
);
}

export default moviesTable;
