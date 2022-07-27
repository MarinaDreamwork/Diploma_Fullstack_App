import React, { useState } from 'react';
import { formattingDate } from '../../../app/utils/dates';
import PagesSectionWrapper from '../../common/styles/pagesSectionWrapper';

const AdminReportSalesPage = () => {
  const [data, setData] = useState('');

  const handleChange = ({ target }) => {
    setData(target.value);
  };

  return (
    <PagesSectionWrapper>
      <div className='d-flex justify-content-start align-items-center m-2 p-2'>
        <p>Выбрать период отчета:</p>
        <input type='month' style={{ width: '120px', border: '1px solid grey' }} value={data} onChange={handleChange} />
      </div>
      <p className='text-left fw-bold fs-5'>Отчет о продажах</p>
      <div className='d-flex flex-column'>
        <div className='d-flex'>
          <p className='p-2'>Всего</p>
          <p className='p-2'>{!data ? '' : 'За ' + formattingDate(data)}</p>
        </div>
        <div className='d-flex'>
          <p className='p-2'>250333</p>
          <p className='p-2'>250364</p>
        </div>
      </div>
    </PagesSectionWrapper>
  );
};

export default AdminReportSalesPage;