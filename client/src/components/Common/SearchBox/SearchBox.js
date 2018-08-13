import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className='form-group'>
      <input
        type='search'
        className='form-control my-2'
        placeholder='Search...'
        value={value}
        onChange={(evt) => onChange(evt.currentTarget.value)}
        name='search'
      />
    </div>
   );
}

export default SearchBox;
