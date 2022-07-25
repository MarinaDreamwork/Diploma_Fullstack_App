import React from 'react';
import { useSelector } from 'react-redux';
import Order from './order';
import { getOrdersData } from '../../../app/store/users';

const Orders = () => {
  const orders = useSelector(getOrdersData());
  // const myOrders = Object.keys(orders).map(myOrder => ({
  //   ...orders[myOrder]
  // }));
  console.log('orders', orders);
  return <>
    {
      orders.length > 0 ?
        orders.map(order => <Order key={order._id} {...order} />) :
        null
    }
  </>;
};

export default Orders;