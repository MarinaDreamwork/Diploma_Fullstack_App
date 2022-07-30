import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { getBooks, getBooksLoadingStatus, loadBooksList } from '../../../app/store/books';
import { getCurrentUser } from '../../../app/store/users';
import Preloader from '../../common/preloader';
import Button from '../../common/styles/button';
import SectionWrapper from '../../common/styles/sectionWrapper';
import TableStyleWrapper from '../../common/styles/tableStyleWrapper';
import FlexStyleWrapper from '../../common/styles/flexStyleWrapper';
import TableBody from '../../common/table/tableBody';
import TableHeader from '../../common/table/tableHeader';
import EditItemPage from '../editItemPage';
import FormStyleTitle from '../../common/styles/formStyleTitle';

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
    return (
      <FlexStyleWrapper
        position='center'
        style='flex-column'
      >
        <FormStyleTitle
          style={{
            textShadow: '1px 1px 2px black',
            margin: '1rem',
            textAlign: 'center'
          }}
          description='Изменение товара:'
        />
        <EditItemPage itemId={itemId} />
      </FlexStyleWrapper>
    );
  }

  if (pathname.includes('create')) {
    return (
      <FlexStyleWrapper
        position='center'
        style='flex-column'
      >
        <FormStyleTitle
          style={{
            textShadow: '1px 1px 2px black',
            margin: '1rem',
            textAlign: 'center'
          }}
          description='Создание товара:'
        />
        <EditItemPage />
      </FlexStyleWrapper>
    );
  }

  if (!isLoading) {
    dispatch(loadBooksList())
  } else {
    return <Preloader color='success' />
  }

  return (
    <SectionWrapper>
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
            color='success'
            description='Добавить новую позицию товара'
          />
        </NavLink>
      </FlexStyleWrapper>
    </SectionWrapper >
  );
};
export default AdminGoodsPage;