import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../common/styles/button';

const PaymentCompleted = () => {
  return (
    <div className='text-center m-5'>
      <NavLink to='/my_orders'>
        <Button
          color='warning'
          description='Перейти в мои заказы'
        />
      </NavLink>
    </div>
  );
};

export default PaymentCompleted;