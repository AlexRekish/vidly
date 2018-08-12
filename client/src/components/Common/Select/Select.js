import React from 'react';

const select = ({ options, name, label, error, onChange, value}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select
        className='custom-select'
        id={name}
        onChange={onChange}
        name={name}
        value={value}
      >
      <option value=''/>
      {options.map((option) => (
        <option value={option._id} key={option._id}>{option.name}</option>
      ))}
      </select>
      {error && <small className='form-text text-muted alert alert-danger m-2'>{error}</small>}
    </div>
   );
}

export default select;
