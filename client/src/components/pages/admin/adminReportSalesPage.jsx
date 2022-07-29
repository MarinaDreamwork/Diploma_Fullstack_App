import React from 'react';
import { useSelector } from 'react-redux';
import { getBooks } from '../../../app/store/books';
import { getDate } from '../../../app/utils/dates';
import FlexStyleWrapper from '../../common/styles/flexStyleWrapper';
//import { useSelector } from 'react-redux';
//import { getUsers } from '../../../app/store/users';
import PagesSectionWrapper from '../../common/styles/pagesSectionWrapper';
import TableStyleWrapper from '../../common/styles/tableStyleWrapper';
import TableBody from '../../common/table/tableBody';
import TableFooter from '../../common/table/tableFooter';
import TableHeader from '../../common/table/tableHeader';

const AdminReportSalesPage = () => {

  //const [data, setData] = useState('');
  //const users = useSelector(getUsers());
  const books = useSelector(getBooks());

  // const handleChange = ({ target }) => {
  //   setData(target.value);
  // };
  const date = new Date();

  const today = getDate(date);

  return (
    <PagesSectionWrapper>
      {/* <div className='d-flex justify-content-start align-items-center m-2 p-2'>
        <p>Выбрать период отчета:</p>
        <input type='month' style={{ width: '120px', border: '1px solid grey' }} value={data} onChange={handleChange} />
      </div> */}
      <FlexStyleWrapper position='center' style='flex-column m-5'>
        <p className='text-left fw-bold ps-5 fs-5'>Отчет о продажах на: {today} </p>
        <TableStyleWrapper color='danger' style='m-5'>
          <TableHeader />
          <TableBody
            content={books} />
          <TableFooter />
        </TableStyleWrapper>
      </FlexStyleWrapper>
      {/* добавить возможность выбирать конкретный месяц 
        <div className='d-flex flex-column'>
          <div className='d-flex'>
          <p className='p-2'>Всего</p>
          <p className='p-2'>{!data ? '' : 'За ' + formattingDate(data)}</p>
        </div>
      </div> */}
    </PagesSectionWrapper>
  );
};

export default AdminReportSalesPage;