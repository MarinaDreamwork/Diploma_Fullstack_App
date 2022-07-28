import React from 'react';
import PropTypes from 'prop-types';

const RadioField = ({ options, name, onChange, value, label, type }) => {
  return (
    <div>
      <div>
        <label
          htmlFor={name}
          className="form-label">
          {label}
        </label>
      </div>
      {options.map(option => (
        <div key={option.id} className='form-check form-check-inline mt-1 mb-2'>
          <input
            className='form-check-input p-0'
            type={type}
            name={name}
            id={option.id}
            onChange={onChange}
            value={option.value}
            checked={option.value === value}
          />
          <label className='form-check-label' htmlFor={option.id}>
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
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default RadioField;