import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder, getCurrentUser } from '../../../app/store/users';
import { getCartContent, clearCartContent } from '../../../app/store/cart';
import TextField from './textField';
import AddressField from './adressField';
import TableHeader from '../table/tableHeader';
import TableBody from '../table/tableBody';
import TableFooter from '../table/tableFooter';
import Button from '../styles/button';
import {
  createOrderNumber
} from '../../../app/utils/createNumbers';
import { changeItemData } from '../../../app/store/books';

const CreateOrderForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUser());
  const addressData = currentUser.address;
  const list = currentUser?.orderList;
  console.log('lastOrderNumber', list);
  const [data, setData] = useState({});
  const cartContent = useSelector(getCartContent());
  const orderDetails = {
    orderTime: Date.now(),
    orderDetails: getCartInfo(cartContent),
    orderNumber: createOrderNumber(list)
  };

  // orderNumber: createOrderNumber(getLastNumber(ordersData))

  function getCartInfo(array) {
    return array.map(item => ({
      goodsId: item._id,
      quantity: item.quantity,
      price: item.price,
      totalAmount: item.price * item.quantity,
      inStock: item.inStock
    }));
  }

  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь данные будут переданы в БД
    const orderData = {
      ...data,
      ...orderDetails
    };
    console.log('orderData', orderData);

    dispatch(createOrder(orderData));
    // эту операцию отслеживаем, забираем только то, что относится к сущности книга + inStock
    orderDetails.orderDetails.map(o => dispatch(changeItemData({ _id: o.goodsId, inStock: o.inStock })));
    dispatch(clearCartContent());
    history.push('/my_payment');
  };

  useEffect(() => {
    setData({
      name: currentUser.name,
      email: currentUser.email,
      zip: addressData.zip,
      street: addressData.street,
      appartment: addressData.appartment,
    });
  }, []);

  return (
    <section>
      <div className='container'>
        <div className='d-flex flex-column justify-content-center m-auto'>
          <form onSubmit={handleSubmit} className='m-3'>
            <TextField
              label='Ваше имя:'
              type='text'
              name='name'
              value={data.name}
              onHandleChange={handleChange}
              error={data.error}
            />
            <TextField
              label='Ваш email:'
              type='text'
              name='email'
              value={data.email}
              onHandleChange={handleChange}
              error={data.error}
            />
            <AddressField
              onChange={handleChange}
              valueZip={data.zip}
              valueStreet={data.street}
              valueApp={data.appartment}
            // errorStreet={errors.street}
            />
            <table className='table table-success'>
              <TableHeader />
              <TableBody cartContent={cartContent} isCart={false} />
              <TableFooter isCart={false} />
            </table>
            <div className='d-flex justify-content-center'>
              <Button
                color='secondary'
                description=' Отправить заказ на обработку' />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateOrderForm;