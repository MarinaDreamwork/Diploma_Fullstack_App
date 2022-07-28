import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from './userPage';
import Main from './main';
import EditUserPage from './editUserPage';

const User = () => {
  const params = useParams();
  const { userId, edit } = params;
  console.log('edit', edit);
  console.log('userId', userId);

  return (
    <section>
      {
        userId ? (
          edit ? (
            <EditUserPage />
          ) : (
            <UserPage />
          )
        ) : (
          <Main />
        )
      }
    </section>
  );
}

export default User;