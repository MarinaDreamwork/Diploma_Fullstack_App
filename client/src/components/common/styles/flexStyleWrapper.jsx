import React from 'react';
import PropTypes from 'prop-types';

const FlexStyleWrapper = ({ children, style, position }) => {
  return (
    <div className={'d-flex justify-content-' + position + ' ' + style}>
      {children}
    </div>
  );
};

FlexStyleWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  style: PropTypes.string,
  position: PropTypes.string
};

export default FlexStyleWrapper;