import React from 'react';
import PropTypes from 'prop-types';

const FooterColumn = ({ title, content }) => {
  return (
    <div className='container ms-5 m-3 me-5 ps-5 pe-5 p-3'>
      <h5 className='mb-0 text-center'>{title}</h5>
      <hr style={{ height: '5px', border: 'none', backgroundColor: 'white', color: 'white' }} />
      <p>{content}</p>
    </div>
  );
};

FooterColumn.propTypes = {
  title: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ])
}

export default FooterColumn;