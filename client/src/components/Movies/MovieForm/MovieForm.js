import React from 'react';

const movieForm = (props) => {
  const clickHandler = () => {
    props.history.replace('/movies');
  };
  return (
    <div>
      <h1>Movie Form {props.match.params.id}</h1>
      <button
        type='button'
        className='btn btn-primary'
        onClick={clickHandler}
      >
        Save
      </button>
    </div>
   );
}

export default movieForm;
