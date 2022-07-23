import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCartContent } from '../../app/store/cart';
import Button from '../common/styles/button';
import Table from '../common/table/table';

const MyCart = () => {
  const history = useHistory();
  const cartContent = useSelector(getCartContent());
  const handleBackToMainPage = () => {
    history.push('/');
  };
  return (
    <section>
      <div className='container'>
        <div className='d-flex m-4 justify-content-center'>
          <Button
            color='success'
            onClick={handleBackToMainPage}
            description='Выбрать товары'
          />
        </div>
        {cartContent.length === 0
          ? <h3 className='m-auto p-3'>В корзине товаров нет</h3>
          : <Table isForAdminBoard={false} />
        }
      </div>
    </section>
  );
};

export default MyCart;