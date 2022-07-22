import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { getBooks } from '../../../app/store/books';
import TableBody from '../../common/table/tableBody';
import TableHeader from '../../common/table/tableHeader';
import EditItemPage from '../editItemPage';
const AdminGoodsPage = () => {

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
    <div className='container p-4'>
      <table className='table table-light'>
        <TableHeader
          isForAdminBoard={true}
        />
        <TableBody
          cartContent={books}
          isCart={false}
          isAdmin={true}
        />
      </table>
      <div className='d-flex justify-content-center'>
        <NavLink to={`/admin/${essence}/create`}>
          <button
            className='btn btn-secondary'>
            Добавить новую позицию товара
          </button>
        </NavLink>
      </div>
    </div>
  );
};
export default AdminGoodsPage;