import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route, useParams } from 'react-router-dom';
import { getIsLoggedIn } from '../../app/store/users';

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const params = useParams();
  console.log('params', params);
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return <Redirect to='/login' />
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ProtectedRoute;