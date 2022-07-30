import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ color, description, onClick, disabled, style }) => {
  return (
    <button
      style={style}
      className={'btn btn-' + color}
      onClick={onClick}
      disabled={disabled}>
      {description}
    </button>
  );
};
Button.propTypes = {
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;