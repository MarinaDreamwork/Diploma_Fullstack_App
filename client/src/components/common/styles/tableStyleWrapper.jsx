import React from 'react';
import PropTypes from 'prop-types';

const TableStyleWrapper = ({ children, color, style, id }) => {
  return (
    <table className={'table table-' + color + ' ' + style} id={id}>
      {children}
    </table>
  );
};

TableStyleWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  color: PropTypes.string.isRequired,
  style: PropTypes.string,
  id: PropTypes.string
};

export default TableStyleWrapper;