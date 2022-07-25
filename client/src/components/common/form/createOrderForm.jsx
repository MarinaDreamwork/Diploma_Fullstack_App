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

const CreateOrderForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUser());
  const addressData = currentUser.address;
  const [data, setData] = useState({});
  const cartContent = useSelector(getCartContent());
  const [orderDetails] = useState({
    id: Date.now().toString(),
    orderTime: Date.now(),
    orderDetails: getCartInfo(cartContent)
  });

  // orderNumber: createOrderNumber(getLastNumber(ordersData))

  function getCartInfo(array) {
    return array.map(item => ({
      goodsId: item.id,
      src: item.src,
      quantity: item.quantity,
      price: item.price,
      totalAmount: item.price * item.quantity
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
    dispatch(createOrder(orderData));
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