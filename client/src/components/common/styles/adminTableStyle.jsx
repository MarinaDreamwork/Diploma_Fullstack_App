import React from 'react';
import PropTypes from 'prop-types';

const AdminTableStyleWrapper = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

AdminTableStyleWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node]),
    PropTypes.node
  ])
};

export default AdminTableStyleWrapper;