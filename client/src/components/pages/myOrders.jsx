import React from 'react';
import Orders from '../Main/orders/orders';

const MyOrders = () => {
  return (
    <section>
      <div className='d-flex flex-column justify-content-center m-3 p-2'>
        <Orders />
      </div>
    </section>
  );
};

export default MyOrders;