import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FieldStyleWrapper from '../styles/fieldStyleWrapper';

const TextField = ({ label, type, name, value, onHandleChange, error, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const getInputClasses = () => {
    return 'shadow ms-0 form-control ' + (error && 'is-invalid');
  };

  return (
    <FieldStyleWrapper>
      <label
        htmlFor={name}
        className="form-label">
        {label}
      </label>
      <div className='input-group has-validation'>
        <input
          type={showPassword ? 'text' : type}
          className={getInputClasses()}
          id={name}
          value={value}
          name={name}
          onChange={onHandleChange}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={toggleShowPassword}>
            {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
          </button>)}
        {
          error && <div className='invalid-feedback'>{error}</div>
        }
      </div>
    </FieldStyleWrapper>
  );
};

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  onHandleChange: PropTypes.func.isRequired
};

export default TextField;