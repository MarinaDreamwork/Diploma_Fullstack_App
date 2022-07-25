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

  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentUser(dispatch(getUserData()));
    }
  }, []);

  if (!isLoggedIn) return <Preloader />
  else {
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