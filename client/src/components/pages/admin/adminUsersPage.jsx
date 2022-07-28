import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCurrentUser, getUsers, loadUsersList } from '../../../app/store/users';
import Preloader from '../../common/preloader';
import PagesSectionWrapper from '../../common/styles/pagesSectionWrapper';
import TableBody from '../../common/table/tableBody';
import TableHeader from '../../common/table/tableHeader';
import RegisterForm from '../../ui/registerForm';
import EditUserPage from '../editUserPage';


const AdminUsersPage = () => {
  const dispatch = useDispatch();
  //const isLoadingUsers = useSelector(getIsLoading());
  const users = useSelector(getUsers());
  const isAdmin = useSelector(getCurrentUser())?.isAdmin;
  const { essence, itemId, edit } = useParams();

  useEffect(() => {
    dispatch(loadUsersList())
  }, []);

  if (itemId === 'create') {
    return (
      <div className='container'>
        <div className='d-flex justify-content-center'>
          <div className='d-flex flex-column m-5 w-50'>
            <h4 className='text-center'>Создать профиль пользователя:</h4>
            <RegisterForm />
          </div>
        </div>
      </div>
    );
  } else if (essence === 'users_page' && edit === 'edit') {
    return <EditUserPage />
  } else if (users) {
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
        </div>
      </PagesSectionWrapper >
    );
  } else return <Preloader color='warning' />
};

export default AdminUsersPage;