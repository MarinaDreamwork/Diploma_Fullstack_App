import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ color, description, onClick }) => {
  return (
    <button
      className={'btn btn-' + color}
      onClick={onClick}>
      {description}
    </button>
  );
};
Button.propTypes = {
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;