import React from 'react';
import PropTypes from 'prop-types';

const SocialNetwork = ({ name }) => {
  return <i className={'bi bi-' + name} style={{ fontSize: '1.5rem' }}></i>
};

SocialNetwork.propTypes = {
  name: PropTypes.string.isRequired
};

export default SocialNetwork;