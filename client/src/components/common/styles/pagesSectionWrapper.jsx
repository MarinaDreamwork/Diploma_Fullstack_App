import React from 'react';
import PropTypes from 'prop-types';

const PagesSectionWrapper = ({ children }) => {
  return (
    <section>
      <div className='container'>
        {children}
      </div>
    </section>
  );
};

PagesSectionWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node]),
    PropTypes.node
  ])
};

export default PagesSectionWrapper;