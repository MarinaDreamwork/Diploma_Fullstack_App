import React from 'react';
import { getDate } from '../../../app/utils/dates';

const ReportDate = () => {
  return (
    <p className='fw-bold'>Дата отчета:
      <span className='text-secondary'>
        {' ' + getDate(new Date())}
      </span>
    </p>
  );
};

export default ReportDate;