import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AdminContext = React.createContext();

export const useAdmin = () => {
  return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(1);
  const pageSize = 3;

  const handlePageChange = (pageIndex) => {
    setActivePage(pageIndex);
  };

  return <AdminContext.Provider value={{ 
    activePage,
    pageSize,
    handlePageChange
   }}>
    { children }
  </AdminContext.Provider>
};

AdminProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};