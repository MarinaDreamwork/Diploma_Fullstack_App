import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({ label, value, type, name, onHandleChange, error }) => {
  const getInputClasses = () => {
    return 'form-check-input ' + (error && 'is-invalid');
  };
  return (
    <div className='col-12'>
      <div className='has-validation form-check mt-3 mb-3'>
        <input
          className={getInputClasses()}
          type={type}
          name={name}
          id={name}
          onChange={onHandleChange}
          value={value} />
        <label className='form-check-label' htmlFor={name}>
          {label}
        </label>
        {
          error && <div className='invalid-feedback'>{error}</div>
        }
      </div>
    </div>
  );
};

CheckBoxField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default CheckBoxField;