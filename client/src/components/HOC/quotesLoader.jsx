import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuotesLoadingStatus, loadQuotesList } from '../../app/store/quotes';
import Preloader from '../common/preloader';
import PropTypes from 'prop-types';

const QuotesLoader = ({ children }) => {
  const QuotesStatusLoading = useSelector(getQuotesLoadingStatus())
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQuotesList());
  }, []);

  if (QuotesStatusLoading) return <Preloader />
  return children;
};

QuotesLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default QuotesLoader;