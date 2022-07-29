import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { getBooks, getBooksLoadingStatus, loadBooksList } from '../../../app/store/books';
import { getCurrentUser } from '../../../app/store/users';
import Preloader from '../../common/preloader';
import Button from '../../common/styles/button';
import PagesSectionWrapper from '../../common/styles/pagesSectionWrapper';
import TableStyleWrapper from '../../common/styles/tableStyleWrapper';
import FlexStyleWrapper from '../../common/styles/flexStyleWrapper';
import TableBody from '../../common/table/tableBody';
import TableHeader from '../../common/table/tableHeader';
import EditItemPage from '../editItemPage';
const AdminGoodsPage = () => {
  const isAdmin = useSelector(getCurrentUser())?.isAdmin;
  const isLoading = useSelector(getBooksLoadingStatus());
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();
  const { essence, itemId } = params;
  const books = useSelector(getBooks());
  const dispatch = useDispatch();

  if (pathname.endsWith('edit')) {
    return <EditItemPage itemId={itemId} />
  }

  if (pathname.includes('create')) {
    return <EditItemPage />
  }

  if (!isLoading) {
    dispatch(loadBooksList())
  } else {
    return <Preloader color='success' />
  }

  return (
    <PagesSectionWrapper>
      <TableStyleWrapper color='success' style='m-3'>
        <TableHeader
          isForAdminBoard={true}
        />
        <TableBody
          content={books}
          isCart={false}
          isAdmin={isAdmin}
        />
      </TableStyleWrapper>
      <FlexStyleWrapper position='center'>
        <NavLink to={`/admin/${essence}/create`}>
          <Button
            style={{ marginBottom: '15px' }}
            color='secondary'
            description='Добавить новую позицию товара'
          />
        </NavLink>
      </FlexStyleWrapper>
    </PagesSectionWrapper >
  );
};
export default AdminGoodsPage;