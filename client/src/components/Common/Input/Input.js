import React from 'react';

const Input = ({ name, label, onChange, value, placeholder, type, error }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className='form-control'
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <small className='form-text text-muted alert alert-danger m-2'>{error}</small>}
    </div>
   );
}

export default Input;
