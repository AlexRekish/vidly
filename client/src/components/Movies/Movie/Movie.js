import React from 'react';

const movie = (props) => {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.genre}</td>
      <td>{props.stock}</td>
      <td>{props.rate}</td>
      <td>
        <button
          onClick={props.delete}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </td>
    </tr>
   );
}

export default movie;
