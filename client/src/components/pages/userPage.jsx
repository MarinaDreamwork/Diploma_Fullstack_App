import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCurrentUser, getIsLoggedIn } from '../../app/store/users';
import Preloader from '../common/preloader';

const UserPage = () => {
  const currentUser = useSelector(getCurrentUser());
  const userAddress = currentUser.address;
  const isUserLoading = useSelector(getIsLoggedIn());
  if (!isUserLoading) return <Preloader color='info' />
  else {
    return (
      <section>
        <div className='container text-center'>
          <div className='d-flex row justify-content-center m-5 bg-secondary bg-opacity-25 rounded shadow'>
            <div className='d-flex justify-content-end'>
              <p className='p-2'>
                <NavLink to={`/my_profile/${currentUser._id}/edit`}>
                  <i className="bi bi-gear-wide-connected" style={{ fontSize: '2rem', color: 'blue' }}>
                  </i>
                </NavLink>
              </p>
            </div>
            <div className='d-inline-flex justify-content-center'>
              <div>
                <div className='col-10 border shadow rounded align-self-center p-2 m-3'>
                  <h5 className='user-style'>{currentUser.name}</h5>
                  <p>{currentUser.sex}</p>
                </div>
                <div className='col-10 border shadow rounded align-self-center p-2 m-3'>
                  <p><span className='user-style'>Email:</span> {currentUser.email}</p>
                </div>
              </div>
              <div className='d-flex flex-column align-self-center col-4 border shadow rounded p-3'>
                <p><span className='user-style'>Адрес доставки при регистрации:</span></p>
                <p><span className='user-style'>индекс:</span> {userAddress.zip}</p>
                <p><span className='user-style'>ул.</span> {userAddress.street}</p>
                <p><span className='user-style'>д.</span> {userAddress.appartment}</p>
              </div>
            </div>
            <div className='d-flex justify-content-end'>
              <p className='p-2'>
                <NavLink to='/logout'>
                  <i className="bi bi-box-arrow-right" style={{ fontSize: '2rem', color: 'blue', fontWeight: 'bold' }}></i>
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default UserPage;