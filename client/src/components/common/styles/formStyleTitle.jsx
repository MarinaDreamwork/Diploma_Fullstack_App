import React from 'react';
import PropTypes from 'prop-types';

const FormStyleTitle = ({ description, style }) => {
  return <h3 className={'text-center' + ' ' + style}>{description}</h3>
};

FormStyleTitle.propTypes = {
  style: PropTypes.object,
  description: PropTypes.string.isRequired
};

export default FormStyleTitle;