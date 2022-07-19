import React from 'react';
import PropTypes from 'prop-types';

const CloseButton = ({ style, onDelete }) => {
  return <i
    className='bi bi-x-lg'
    style={style}
    onClick={onDelete}></i>;
};

CloseButton.propTypes = {
  onCloseBtn: PropTypes.string,
  navStatus: PropTypes.string,
  style: PropTypes.string.isRequired,
  onDelete: PropTypes.string.isRequired
}

export default CloseButton;