import React from 'react';
import { useSelector } from 'react-redux';
import { getBooks } from '../../../app/store/books';
import { getCurrentUser } from '../../../app/store/users';
import PagesSectionWrapper from '../../common/styles/pagesSectionWrapper';
import TableStyleWrapper from '../../common/styles/tableStyleWrapper';
import TableBody from '../../common/table/tableBody';
import TableFooter from '../../common/table/tableFooter';
import TableHeader from '../../common/table/tableHeader';
import ReportDate from './reportDate';

const AdminReportRemainsPage = () => {

  const books = useSelector(getBooks());
  const isAdmin = useSelector(getCurrentUser())?.isAdmin;

  return (
    <PagesSectionWrapper>
      <div className='m-2'>
        <p className='text-left fw-bold fs-5'>Отчет об остатках товара</p>
        <ReportDate />
        <TableStyleWrapper color='secondary'>
          <TableHeader />
          <TableBody
            content={books}
            isCart={false}
            isAdmin={isAdmin}
          />
          <TableFooter page='report_remains' />
        </TableStyleWrapper>
        <p>* отчет формируется на последнее число месяца</p>
      </div>
    </PagesSectionWrapper>
  );
};

export default AdminReportRemainsPage;