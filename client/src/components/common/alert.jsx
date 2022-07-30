import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ color, quantity }) => {
  return (
    <span className={'position-absolute top-0 start-100 translate-middle badge rounded-pill ' + color}>
      {quantity}
      <span className="visually-hidden">unread messages</span>
    </span>
  );
};
Alert.propTypes = {
  color: PropTypes.string.isRequired,
  quantity: PropTypes.number
}

export default Alert;