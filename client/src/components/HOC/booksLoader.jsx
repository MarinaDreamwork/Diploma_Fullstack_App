import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooksLoadingStatus, loadBooksList } from '../../app/store/books';
import { getCurrentUser, getIsLoggedIn, getUserData, loadUsersList } from '../../app/store/users';
import Preloader from '../common/preloader';
import PropTypes from 'prop-types';
//import { getUserId } from '../../app/services/localStorage.service';

const BooksLoader = ({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isAdmin = useSelector(getCurrentUser())?.isAdmin;
  const BooksStatusLoading = useSelector(getBooksLoadingStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBooksList());
    if (isLoggedIn) {
      dispatch(getUserData());
      dispatch(loadBooksList());
    }
    if (isAdmin) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  if (BooksStatusLoading) return <Preloader color='primary' />
  return children;
};

BooksLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default BooksLoader;