import React from 'react';
import { useSelector } from 'react-redux';
import { getBooks } from '../../../app/store/books';
//import FlexStyleWrapper from '../../common/styles/flexStyleWrapper';
//import { useSelector } from 'react-redux';
//import { getUsers } from '../../../app/store/users';
import SectionWrapper from '../../common/styles/sectionWrapper';
import TableStyleWrapper from '../../common/styles/tableStyleWrapper';
import TableBody from '../../common/table/tableBody';
import TableFooter from '../../common/table/tableFooter';
import TableHeader from '../../common/table/tableHeader';
import ReportDate from './reportDate';
3
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import FlexStyleWrapper from '../../common/styles/flexStyleWrapper';

const AdminReportSalesPage = () => {
  //const [data, setData] = useState('');
  //const users = useSelector(getUsers());
  const books = useSelector(getBooks());
  // const handleChange = ({ target }) => {
  //   setData(target.value);
  // };

  return (
    <SectionWrapper>
      {/* <div className='d-flex justify-content-start align-items-center m-2 p-2'>
        <p>Выбрать период отчета:</p>
        <input type='month' style={{ width: '120px', border: '1px solid grey' }} value={data} onChange={handleChange} />
      </div> */}
      {/* <FlexStyleWrapper position='center' style='flex-column m-5'> */}
      <div className='m-2'>
        <p className='text-left fw-bold ms-5 fs-5'>Отчет о продажах</p>
        <ReportDate style='ms-5' />
        <TableStyleWrapper
          color='danger'
          style='m-5'
          id='table-sales'
        >
          <TableHeader />
          <TableBody
            content={books} />
          <TableFooter
            isCart={false} />
        </TableStyleWrapper>
        <FlexStyleWrapper
          position='center'
          style='m-5'
        >
          <ReactHTMLTableToExcel
            id='table-sales-button'
            className='download-table-button btn btn-success'
            table='table-sales'
            filename='book sales'
            sheet='sales'
            buttonText='Выгрузить данные в Excel'
          />
        </FlexStyleWrapper>
      </div>
      {/* добавить возможность выбирать конкретный месяц 
        <div className='d-flex flex-column'>
          <div className='d-flex'>
          <p className='p-2'>Всего</p>
          <p className='p-2'>{!data ? '' : 'За ' + formattingDate(data)}</p>
        </div>
      </div> */}
    </SectionWrapper>
  );
};

export default AdminReportSalesPage;