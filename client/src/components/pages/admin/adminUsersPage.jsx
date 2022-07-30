import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getCurrentUser, getIsLoading, getUsers, loadUsersList } from '../../../app/store/users';
import Preloader from '../../common/preloader';
import SectionWrapper from '../../common/styles/sectionWrapper';
import TableStyleWrapper from '../../common/styles/tableStyleWrapper';
import TableBody from '../../common/table/tableBody';
import TableHeader from '../../common/table/tableHeader';
import EditUserPage from '../editUserPage';


const AdminUsersPage = () => {

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { itemId } = useParams();
  const isLoadingUsers = useSelector(getIsLoading());
  const users = useSelector(getUsers());
  const isAdmin = useSelector(getCurrentUser())?.isAdmin;

  useEffect(() => {
    dispatch(loadUsersList())
  }, []);

  if (pathname.includes('users_page') && pathname.includes('edit')) {
    return <EditUserPage itemId={itemId} />
  }
  if (isLoadingUsers) return <Preloader color='primary' />
  else return (
    <SectionWrapper>
      <div className='container p-4'>
        <TableStyleWrapper color='primary'>
          <TableHeader
            isForAdminBoard={true}
          />
          <TableBody
            content={users}
            isCart={false}
            isAdmin={isAdmin}
          />
        </TableStyleWrapper>
      </div>
    </SectionWrapper >
  );
};

export default AdminUsersPage;