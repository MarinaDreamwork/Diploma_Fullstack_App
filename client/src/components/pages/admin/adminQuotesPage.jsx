import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getQuotes } from '../../../app/store/quotes';
import { getCurrentUser } from '../../../app/store/users';
import Preloader from '../../common/preloader';
import PagesSectionWrapper from '../../common/styles/pagesSectionWrapper';
import TableBody from '../../common/table/tableBody';
import TableHeader from '../../common/table/tableHeader';
import EditQuotePage from '../editQuotePage';
const AdminQuotesPage = () => {
  const isAdmin = useSelector(getCurrentUser())?.isAdmin;
  const quotes = useSelector(getQuotes());

  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();
  const { essence } = params;
  const itemId = pathname.replaceAll('/', '').replace('admin', '').replace(`${essence}`, '').replace('edit', '');

  if (pathname.endsWith('edit')) {
    return <EditQuotePage itemId={itemId} />
  }

  if (!quotes) return <Preloader />
  return (
    <PagesSectionWrapper>
      <table className='table table-warning m-3'>
        <TableHeader
          isForAdminBoard={true}
        />
        <TableBody
          cartContent={quotes}
          isCart={false}
          isAdmin={isAdmin}
        />
      </table >
    </PagesSectionWrapper>
  );
};

export default AdminQuotesPage;