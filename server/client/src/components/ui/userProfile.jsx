import React from 'react';
import { getCurrentUser } from '../../app/store/users';
import { useSelector } from 'react-redux';
import Preloader from '../common/preloader';
import ButtonLink from '../common/buttonLink';

const UserProfile = () => {
  const currentUser = useSelector(getCurrentUser());

  if (!currentUser) return <Preloader />
  return (
    <ButtonLink
      key='1'
      to={`/my_profile/${currentUser._id}`}
      hint={currentUser.name}
      individualClass='bi-person-circle'
    />
  )
};

export default UserProfile;