import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCartContent } from '../../app/store/cart';
import Button from '../common/styles/button';
import FlexStyleWrapper from '../common/styles/flexStyleWrapper';
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
        <FlexStyleWrapper style='m-4'>
          <Button
            color='success'
            onClick={handleBackToMainPage}
            description='Выбрать товары'
          />
        </FlexStyleWrapper>
        {cartContent.length === 0
          ? <h3 className='m-auto p-3'>В корзине товаров нет</h3>
          : <Table isForAdminBoard={false} />
        }
      </div>
    </section>
  );
};

export default MyCart;