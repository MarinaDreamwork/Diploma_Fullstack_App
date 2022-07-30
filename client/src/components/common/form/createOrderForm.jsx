import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrderInUser, getCurrentUser } from '../../../app/store/users';
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
import { validator, validatorConfig } from '../../../app/utils/validator';
import TableStyleWrapper from '../styles/tableStyleWrapper';
import FlexStyleWrapper from '../styles/flexStyleWrapper';
import { createOrder } from '../../../app/store/orders';
import SectionWrapper from '../styles/sectionWrapper';
import FormStyleTitle from '../styles/formStyleTitle';

const CreateOrderForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser());
  const addressData = currentUser?.address;
  const list = currentUser?.orderList;
  const content = useSelector(getCartContent());
  const orderDetails = {
    orderTime: Date.now(),
    orderDetails: getCartInfo(content),
    orderNumber: list && createOrderNumber(list)
  };

  const [data, setData] = useState({
    name: '',
    email: '',
    zip: '',
    street: '',
    appartment: ''
  });
  const [errors, setErrors] = useState({});

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
    const isValid = validate();
    if (!isValid) return;

    const orderData = {
      ...data,
      ...orderDetails
    };
    console.log('orderData', orderData);
    dispatch(createOrder({ ...orderDetails, userId: currentUser._id }));
    dispatch(createOrderInUser(orderData));
    // эту операцию отслеживаем, забираем только то, что относится к сущности книга + inStock
    orderDetails.orderDetails.map(o => dispatch(changeItemData({ _id: o.goodsId, inStock: o.inStock })));
    dispatch(clearCartContent());
    history.push('/my_payment');
  };

  // useEffect(() => {
  //   dispatch(getUserData());
  // }, [])

  useEffect(() => {
    setData({
      name: currentUser?.name,
      email: currentUser?.email,
      zip: addressData?.zip,
      street: addressData?.street,
      appartment: addressData?.appartment,
    });
  }, []);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <SectionWrapper>
      <FlexStyleWrapper position='center' style='flex-column m-auto'>
        <FormStyleTitle description='Оформить заказ:' />
        <form onSubmit={handleSubmit} className='m-3'>
          <div className='m-auto'>
            <TextField
              label='Ваше имя:'
              name='name'
              value={data.name}
              onHandleChange={handleChange}
              error={data.error}
            />
            <TextField
              label='Ваш email:'
              name='email'
              value={data.email}
              onHandleChange={handleChange}
              error={data.error}
            />
            <AddressField
              label='Введите адрес доставки:'
              onChange={handleChange}
              valueZip={data.zip}
              valueStreet={data.street}
              valueApp={data.appartment}
              nameZip='zip'
              nameStreet='street'
              nameApp='appartment'
              errorzip={errors.zip}
              errorstreet={errors.street}
              errorapp={errors.appartment}
            />
          </div>
          <TableStyleWrapper color='success'>
            <TableHeader />
            <TableBody content={content} isCart={false} />
            <TableFooter isCart={false} />
          </TableStyleWrapper>
          <FlexStyleWrapper position='center'>
            <Button
              disabled={!isValid}
              color='secondary'
              description='Отправить заказ на обработку'
            />
          </FlexStyleWrapper>
        </form>
      </FlexStyleWrapper>
    </SectionWrapper>
  );
};

export default CreateOrderForm;