import React from 'react';
import Like from '../../../Common/Like/Like';

const movie = (props) => {
  const {
    title,
    genre,
    numberInStock: stock,
    dailyRentalRate: rate
  } = props.movie;
  return (
    <tr>
      <td>{title}</td>
      <td>{genre.name}</td>
      <td>{stock}</td>
      <td>{rate}</td>
      <td>
        <Like
          onLike={props.onLike}
          liked={props.liked}
        />
      </td>
      <td>
        <button
          onClick={props.delete}
          className='btn btn-danger btn-sm'
        >
          Delete
        </button>
      </td>
    </tr>
   );
}

export default movie;
