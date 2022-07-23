import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getCurrentUser, getIsLoading, getUsers, loadUsersList } from '../../../app/store/users';
import Preloader from '../../common/preloader';
import Button from '../../common/styles/button';
import PagesSectionWrapper from '../../common/styles/pagesSectionWrapper';
import TableBody from '../../common/table/tableBody';
import TableHeader from '../../common/table/tableHeader';
import RegisterForm from '../../ui/registerForm';

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const isLoadingUsers = useSelector(getIsLoading());
  const users = useSelector(getUsers());
  const isAdmin = useSelector(getCurrentUser())?.isAdmin;
  const { essence, itemId } = useParams();

  useEffect(() => {
    dispatch(loadUsersList())
  }, []);

  if (isLoadingUsers) return <Preloader />
  else if (itemId === 'create') return <RegisterForm />
  else {
    return (
      <PagesSectionWrapper>
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
          <div className='d-flex justify-content-center'>
            <NavLink to={`/admin/${essence}/create`}>
              <Button
                color='secondary'
                description='Добавить нового пользователя' />
            </NavLink>
          </div>
        </div>
      </PagesSectionWrapper>
    );
  }
};

export default AdminUsersPage;