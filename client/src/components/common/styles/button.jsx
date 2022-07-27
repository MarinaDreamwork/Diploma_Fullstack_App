import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ color, description, onClick, disabled, style }) => {
  return (
    <button
      className={color ? 'btn btn-' + color + ' ' + style : '' + style}
      onClick={onClick}
      disabled={disabled}>
      {description}
    </button>
  );
};
Button.propTypes = {
  color: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;