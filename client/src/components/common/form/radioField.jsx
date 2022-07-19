import React from 'react';
import PropTypes from 'prop-types';

const RadioField = ({ options, name, onChange, value, label }) => {
  return (
    <div className='mb-4'>
      <label
        htmlFor={name}
        className="form-label">
        {label}
      </label>
      {options.map(option => (
        <div key={option.id} className='form-check form-check-inline'>
          <input
            className='form-check-input'
            type='radio'
            name={name}
            id={option.id}
            onChange={onChange}
            value={option.value}
            checked={option.value === value}
          />
          <label className='form-check-label' htmlFor='flexRadioDefault1'>
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default RadioField;