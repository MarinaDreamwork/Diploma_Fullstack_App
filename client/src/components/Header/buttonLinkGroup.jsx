import React from 'react';
import ButtonLink from '../common/buttonLink';
import { useSelector } from 'react-redux';
import { getCurrentUser, getIsLoggedIn } from '../../app/store/users';
import UserProfile from '../ui/userProfile';

const ButtonLinkGroup = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUser = useSelector(getCurrentUser());
  const buttonsLinkData = [
    // {id: 1, to: `/my_profile/${currentUser.userId}`, hint: `${currentUser.name}`, class: 'bi-person-circle'},
    { id: 2, to: '/my_cart', hint: 'Корзина', class: 'bi-cart4' },
    { id: 3, to: '/my_favorites', hint: 'Избранное', class: '', isFavorite: false },
    { id: 4, to: '/my_orders', hint: 'Мои заказы', class: 'bi-box-seam' },
    { id: 5, to: '/admin', hint: 'Панель администратора', class: 'bi-clipboard-data' }
  ];
  if (isLoggedIn) {
    return (
      <>
        <div className='d-flex'>
          <UserProfile />
          {buttonsLinkData.map(button => <ButtonLink
            key={button.id}
            to={button.to}
            hint={button.id === 1 ? currentUser.name : button.hint}
            individualClass={button.class}
            isFavorite={false}
          />)
          }
        </div>
      </>
    )
  }
  return (
    <ButtonLink
      key='1'
      to='/login'
      hint='Регистрация/авторизация'
      individualClass='bi-person-circle'
    />
  )
};

export default ButtonLinkGroup;