import React from 'react';
import PropTypes from 'prop-types';

const Preloader = ({ color }) => {
  return (
    <div className='m-auto p-5'>
      <div
        className={'spinner-border text-' + color}
        role='status'
      >
        <span
          className='visually-hidden'
        >Loading...
        </span>
      </div>
    </div>
  );
};

Preloader.propTypes = {
  color: PropTypes.string
};

export default Preloader;