import React from 'react';
import PropTypes from 'prop-types';

const Quote = ({
  id,
  content,
  author
}) => {
  return (
    <div
      key={id}
      className='p-2'>
      <q
        className='m-2 quote-content'>
        {content}
      </q>
      <p>
        <i>{author}</i>
      </p>
    </div>
  );
};
Quote.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};
export default Quote;