import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const PaginationContext = React.createContext();

export const usePagination = () => {
  return useContext(PaginationContext);
};

export const PaginationProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(1);
  const pageSize = 3;

  const handlePageChange = (pageIndex) => {
    setActivePage(pageIndex);
  };

  return <PaginationContext.Provider value={{ 
    activePage,
    pageSize,
    handlePageChange
   }}>
    { children }
  </PaginationContext.Provider>
};

PaginationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};