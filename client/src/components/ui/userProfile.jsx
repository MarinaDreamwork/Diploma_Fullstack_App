import React, { useEffect } from 'react';
import { getCurrentUser, getIsLoggedIn, getUserData } from '../../app/store/users';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Preloader from '../common/preloader';
import ButtonLink from '../common/buttonLink';

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(useSelector(getCurrentUser()));
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  // //const isLoading = useSelector(getIsLoading())

  // const [isOpen, setOpen] = useState(false);
  // const toggleMenu = () => {
  //   setOpen((prevState) => !prevState);
  // };

  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentUser(dispatch(getUserData()));
    }
  }, []);

  if (!isLoggedIn) return <Preloader />
  else {
    //   return (
    //     <div className='dropdown' onClick={toggleMenu}>
    //       <div className='btn dropdown-toggle d-flex align-items-center p-0'>
    //         <div className='m-2'>
    //           <i
    //             className='bi bi-person-circle d-flex flex-column mb-0 mt-2'
    //             style={{ fontSize: '1.5rem', color: 'white' }}
    //           >
    //           </i>
    //           <div style={{ color: 'white' }} className='m-0'>{currentUser.name}</div>
    //         </div>
    //       </div>
    //       <div className={'m-0 dropdown-menu' + (isOpen ? ' show' : '')}>
    //         <Link
    //           to={`/my_profile/${currentUser.userId}`}
    //           className='dropdown-item'>
    //           Profile
    //         </Link>
    //         <Link
    //           to='/logout'
    //           className='dropdown-item'>
    //           Выход из системы
    //         </Link>
    //       </div>
    //     </div>
    //   );
    // }
    return (
      <ButtonLink
        key='1'
        to={`/my_profile/${currentUser.userId}`}
        hint={currentUser.name}
        individualClass='bi-person-circle'
      />
    )
  }
};

export default UserProfile;