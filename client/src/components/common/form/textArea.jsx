import React from 'react';
import PropTypes from 'prop-types';
import FieldStyleWrapper from '../styles/fieldStyleWrapper';

const TextArea = ({ label, onHandleChange, name, value }) => {
  return (
    <FieldStyleWrapper>
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        {label}
      </label>
      <textarea
        value={value}
        name={name}
        className="form-control shadow"
        id="exampleFormControlTextarea1"
        rows="3"
        onChange={onHandleChange}
      />
    </FieldStyleWrapper>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default TextArea;