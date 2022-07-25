import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { getBooks } from '../../../app/store/books';
import { getCurrentUser } from '../../../app/store/users';
import Button from '../../common/styles/button';
import PagesSectionWrapper from '../../common/styles/pagesSectionWrapper';
import TableBody from '../../common/table/tableBody';
import TableHeader from '../../common/table/tableHeader';
import EditItemPage from '../editItemPage';
const AdminGoodsPage = () => {
  const isAdmin = useSelector(getCurrentUser())?.isAdmin;
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();
  const { essence } = params;
  const books = useSelector(getBooks());
  const itemId = pathname.replaceAll('/', '').replace('admin', '').replace(`${essence}`, '').replace('edit', '');

  //  useEffect(() => {
  //   setItems(books);
  // }, [books])

  if (pathname.endsWith('edit')) {
    return <EditItemPage itemId={itemId} />
  }

  if (pathname.includes('create')) {
    return <EditItemPage />
  }

  return (
    <PagesSectionWrapper>
      <table className='table table-success m-3'>
        <TableHeader
          isForAdminBoard={true}
        />
        <TableBody
          cartContent={books}
          isCart={false}
          isAdmin={isAdmin}
        />
      </table >
      <div className='d-flex justify-content-center'>
        <NavLink to={`/admin/${essence}/create`}>
          <Button
            color='secondary'
            description='Добавить новую позицию товара'
          />
        </NavLink>
      </div>
    </PagesSectionWrapper>
  );
};
export default AdminGoodsPage;