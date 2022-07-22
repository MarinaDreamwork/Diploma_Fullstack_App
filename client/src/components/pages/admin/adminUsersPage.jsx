import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getIsLoading, getUsers, loadUsersList } from '../../../app/store/users';
import Preloader from '../../common/preloader';
import TableBody from '../../common/table/tableBody';
import TableHeader from '../../common/table/tableHeader';

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const isLoadingUsers = useSelector(getIsLoading());
  const users = useSelector(getUsers());
  const isAdmin = useSelector(getCurrentUser())?.isAdmin;

  useEffect(() => {
    dispatch(loadUsersList())
  }, []);

  if (isLoadingUsers) return <Preloader />
  else {
    return (
      <div className='container p-4'>
        <div className='container p-4'>
          <table className='table table-success'>
            <TableHeader
              isForAdminBoard={true}
            />
            <TableBody
              cartContent={users}
              isCart={false}
              isAdmin={isAdmin}
            />
          </table >
          {/* <div className='d-flex justify-content-center'>
          <NavLink to={`/admin/${essence}/create`}>
            <button
              className='btn btn-secondary'>
              Добавить новую позицию товара
            </button>
          </NavLink>
        </div> */}
        </div>
      </div>
    );
  }
};

export default AdminUsersPage;