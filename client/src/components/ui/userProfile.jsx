import React, { useEffect } from 'react';
import { getCurrentUser, getIsLoading, getUserData } from '../../app/store/users';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../common/preloader';

const UserProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser());
  const isLoading = useSelector(getIsLoading())

  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(getUserData());
    }
  }, []);

  if (isLoading) return <Preloader />

  return (
    <div className='dropdown' onClick={toggleMenu}>
      <div className='btn dropdown-toggle d-flex align-items-center p-0'>
        <div className='d-flex flex-column'>
          <i
            className='bi bi-person-circle m-auto'
            style={{ fontSize: '1.5rem', color: 'white' }}
          >
          </i>
          <div style={{ color: 'white' }} className='m-0'>{currentUser.name}</div>
        </div>
      </div>
      <div className={'dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link
          to={`/my_profile/${currentUser.userId}`}
          className='dropdown-item'>
          Profile
        </Link>
        <Link
          to='/logout'
          className='dropdown-item'>
          Выход из системы
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;