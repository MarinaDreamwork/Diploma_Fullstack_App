import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getQuotes } from '../../../app/store/quotes';
import { getCurrentUser } from '../../../app/store/users';
import Preloader from '../../common/preloader';
import SectionWrapper from '../../common/styles/sectionWrapper';
import TableStyleWrapper from '../../common/styles/tableStyleWrapper';
import TableBody from '../../common/table/tableBody';
import TableHeader from '../../common/table/tableHeader';
import EditQuotePage from '../editQuotePage';

const AdminQuotesPage = () => {
  const isAdmin = useSelector(getCurrentUser())?.isAdmin;
  const quotes = useSelector(getQuotes());

  const location = useLocation();
  const pathname = location.pathname;

  if (pathname.endsWith('edit')) {
    return <EditQuotePage />
  }

  if (!quotes) return <Preloader color='warning' />
  return (
    <SectionWrapper>
      <TableStyleWrapper color='warning' style='m-3'>
        <TableHeader
          isForAdminBoard={true}
        />
        <TableBody
          content={quotes}
          isCart={false}
          isAdmin={isAdmin}
        />
      </TableStyleWrapper>
    </SectionWrapper>
  );
};

export default AdminQuotesPage;