import React from 'react';
import { Link } from 'react-router-dom';
import Like from '../../Common/Like/Like';
import Table from '../../Common/Table/Table';
import { getCurrentUser } from './../../../services/authService';

const MoviesTable = ({ movies, onDelete, onLike, onSort, sortColumn }) => {
  const columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      )
    },
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
    }
  ];
  if (getCurrentUser() && getCurrentUser().isAdmin) columns.push(
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
    });
  return (
    <Table
      data={movies}
      onSort={onSort}
      sortColumn={sortColumn}
      columns={columns}
    />
);
}

export default MoviesTable;
