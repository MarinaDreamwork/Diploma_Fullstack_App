import React from 'react';
import { useSelector } from 'react-redux';
import Order from './order';
import { getOrdersData } from '../../../app/store/users';
import Button from '../../common/styles/button';
import { useHistory } from 'react-router-dom';

const Orders = () => {
  const orders = useSelector(getOrdersData());
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  console.log('orders', orders);
  return <>
    {
      orders.length > 0 ?
        orders.map(order => <Order key={order._id} {...order} />) :
        <div
          className='container'
          style={{
            background: 'url("https://ug.ru/wp-content/uploads/2021/12/kniga.jpg")',
            backgroundSize: 'cover'
          }}>
          <div className='row justify-content-center m-5'>
            <div className='col-md-4'>
              <p className='text-center text-white text-opacity-50 fw-bold p-3 m-3'>К сожалению, заказов пока нет...</p>
              <div className='d-flex flex-column justify-content-center'>
                <Button
                  description='Срочно исправить ситуацию!' color='secondary'
                  onClick={handleClick}
                />
              </div>
            </div>
          </div>
        </div>
    }
  </>;
};

export default Orders;