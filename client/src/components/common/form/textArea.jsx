import React from 'react';
import PropTypes from 'prop-types';
import FieldStyleWrapper from '../styles/fieldStyleWrapper';

const TextArea = ({ label, onHandleChange, name, value, error }) => {
  const getInputClasses = () => {
    return 'form-control shadow ' + (error && 'is-invalid');
  };

  return (
    <FieldStyleWrapper>
      <label className="form-label">
        {label}
      </label>
      <textarea
        value={value}
        name={name}
        className={getInputClasses()}
        rows="3"
        onChange={onHandleChange}
      />
      {
        error && <div className='invalid-feedback'>{error}</div>
      }
    </FieldStyleWrapper>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default TextArea;