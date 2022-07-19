import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCartContent } from '../../app/store/cart';
import Table from '../common/table/table';

const MyCart = () => {
  const history = useHistory();
  const cartContent = useSelector(getCartContent());
  const handleBackToMainPage = () => {
    history.push('/');
  };
  return (
    <>
      <div className='d-flex m-4 justify-content-center'>
        <button className='btn btn-success' onClick={handleBackToMainPage}>Выбрать товары</button>
      </div>
      {cartContent.length === 0
        ? <h3 className='m-auto p-3'>В корзине товаров нет</h3>
        : <Table isForAdminBoard={false} />
      }
    </>
  );
};

export default MyCart;