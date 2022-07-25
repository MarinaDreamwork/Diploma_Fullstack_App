import React from 'react';
import PropTypes from 'prop-types';

const Quote = ({
  _id,
  content,
  author
}) => {
  return (
    <div
      key={_id}
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
  _id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};
export default Quote;