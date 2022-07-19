import React from 'react';
import { useSelector } from 'react-redux';
import Order from './order';
import { getOrdersData } from '../../../app/store/users';

const Orders = () => {
  const orders = useSelector(getOrdersData());
  console.log('orders', orders);
  const myOrders = Object.keys(orders).map(myOrder => ({
    ...orders[myOrder]
  }));
  return <>
    {
      myOrders.length > 0 ?
        myOrders.map(order => <Order key={order.id} {...order} />) :
        null
    }
  </>;
};

export default Orders;