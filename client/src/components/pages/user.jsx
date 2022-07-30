import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from './userPage';
import Main from './main';
import EditUserPage from './editUserPage';
import SectionWrapper from '../common/styles/sectionWrapper';

const User = () => {
  const params = useParams();
  const { itemId, edit } = params;

  return (
    <SectionWrapper>
      {
        itemId ? (
          edit ? (
            <EditUserPage />
          ) : (
            <UserPage />
          )
        ) : (
          <Main />
        )
      }
    </SectionWrapper>
  );
}

export default User;