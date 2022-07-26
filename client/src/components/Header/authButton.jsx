import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const AuthButton = ({ to, individualClass, hint }) => {
  const getClassName = () => {
    return 'bi d-flex justify-content-center align-self-center m-0' + individualClass;
  };
  return (
    <div className='m-2'>
      <NavLink
        to={to}
        className='d-flex flex-column'
        style={{ color: 'white', textDecoration: 'none' }}
      >
        <i
          className={getClassName()}
          style={{ fontSize: '1.5rem', color: 'white' }}>
        </i>
        <p
          className='align-self-center m-0'
        >
          {hint}
        </p>
      </NavLink>
    </div>
  );
};
AuthButton.propTypes = {
  to: PropTypes.string.isRequired,
  individualClass: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired
}

export default AuthButton;