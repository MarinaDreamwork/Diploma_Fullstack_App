import React from 'react';
import PropTypes from 'prop-types';

const CloseButton = ({ style, onDelete }) => {
  return <i
    className='bi bi-x-lg'
    style={style}
    onClick={onDelete}></i>;
};

CloseButton.propTypes = {
  style: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default CloseButton;