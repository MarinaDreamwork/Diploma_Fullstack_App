import React from 'react';
import PropTypes from 'prop-types';
import { getDate } from '../../../app/utils/dates';

const ReportDate = ({ style }) => {
  return (
    <p className={'fw-bold' + ' ' + style}>Дата отчета:
      <span className='text-secondary'>
        {' ' + getDate(new Date())}
      </span>
    </p>
  );
};

ReportDate.propTypes = {
  style: PropTypes.string
};

export default ReportDate;