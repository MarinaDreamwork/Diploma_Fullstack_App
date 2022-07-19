import React, { useState } from 'react';
import PropTypes from 'prop-types';


const TextField = ({ label, type, name, value, onHandleChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  }

  const getInputClasses = () => {
    return 'form-control ' + (error && 'is-invalid');
  }
  return (
    <div className="mb-3">
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
        />
        {type === 'password' && (
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={toggleShowPassword}>
            {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
          </button>)}
        {
          error && <div className='invalid-feedback'>{error}</div>
        }
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onHandleChange: PropTypes.func.isRequired
};

export default TextField;