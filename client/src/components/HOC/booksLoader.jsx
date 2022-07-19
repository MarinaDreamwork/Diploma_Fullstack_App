import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooksLoadingStatus, loadBooksList } from '../../app/store/books';
import { getIsLoggedIn, getUserData } from '../../app/store/users';
import Preloader from '../common/preloader';
import PropTypes from 'prop-types';

const BooksLoader = ({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const BooksStatusLoading = useSelector(getBooksLoadingStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBooksList());
    if (isLoggedIn) {
      dispatch(getUserData());
    }
  }, [isLoggedIn]);

  if (BooksStatusLoading) return <Preloader />
  return children;
};

BooksLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default BooksLoader;