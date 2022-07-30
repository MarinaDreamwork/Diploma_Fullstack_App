import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { loadBooksList } from '../../app/store/books';
import { getIsLoggedIn, getUserData } from '../../app/store/users';
import Preloader from '../common/preloader';
import PropTypes from 'prop-types';
import { loadOrdersList } from '../../app/store/orders';
//import { loadOrdersList } from '../../app/store/orders';
//import { getUserId } from '../../app/services/localStorage.service';

const UserLoader = ({ children }) => {
  //const isAdmin = useSelector(getCurrentUser())?.isAdmin;
  const isLoggedIn = useSelector(getIsLoggedIn());
  const dispatch = useDispatch();

  useEffect(() => {
    //   dispatch(loadBooksList());
    if (!isLoggedIn) {
      dispatch(getUserData());
      //     dispatch(loadUsersList());
      dispatch(loadOrdersList());
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Preloader color='secondary' />
  return children;
};

UserLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UserLoader;