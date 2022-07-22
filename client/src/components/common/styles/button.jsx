import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ color, description }) => {
  return (
    <button
      type='button'
      className={'btn btn-' + color}>
      {description}
    </button>
  );
};
Button.propTypes = {
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Button;