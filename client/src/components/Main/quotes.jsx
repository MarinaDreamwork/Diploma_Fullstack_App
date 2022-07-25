import React from 'react';
import { useSelector } from 'react-redux';
import { getQuotes } from '../../app/store/quotes';
import Quote from './quote';
const Quotes = () => {
  const quotes = useSelector(getQuotes());

  return (
    <aside className='container__left Quotes style d-flex flex-column justify-content-center align-items-center p-3'>
      {
        quotes.map(quote => (<Quote key={quote._id} {...quote} />))
      }
    </aside>
  );
};

export default Quotes;