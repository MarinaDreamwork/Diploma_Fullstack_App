import React from 'react';
import PropTypes from 'prop-types';
//import { useSelector } from 'react-redux';
import { getDate } from '../../../app/utils/getDate';
import { calculateOrderSumm } from '../../../app/utils/calculateTotalSumm';

const Order = ({ _id, orderTime, address, orderDetails }) => {
  const orderDate = new Date(orderTime);
  console.log('address', address);
  // const newDate = orderDate.getDate() + 3;
  // console.log('orderDate > newDate', orderTime > newDate);
  // console.log('orderDate < newDate', orderTime < newDate);
  // console.log('newDate', new Date(orderDate.setDate(newDate)));
  // написать ф-цию проверки - если сегодня >= дата заказа + 3 дня, то отобразить доставлено зеленым, если < , то на пути к пункту доставки, желтым 

  return (
    <div className='border shadow rounded border-light w-50 mb-4 m-auto'>
      <div className='d-flex bg-light justify-content-between p-3'>
        <div>
          <div>
            <p className='fw-bold fs-4'>Заказ от {getDate(orderDate)}</p>
          </div>
          <div>
            <span>номер заказа: <span className='fw-bold'>{_id}</span></span>
          </div>
        </div>
        <div>
          <span className='fw-bold'>сумма заказа: {calculateOrderSumm(orderDetails)} ₽</span>
        </div>
      </div>
      <div className='d-flex justify-content-between p-2'>
        <div>
          <p key={address.zip}>Доставка Почтой России по адресу: {address.zip} ул. {address.street} д. {address.appartment} </p>

        </div>
        <div>
          <p className={'badge bg-success'}>Доставлено</p>
        </div>
        <div>
          {
            orderDetails.map(detail => (<>
              <img src={detail.src} style={{ width: '60px', marginRight: '5px' }} />
            </>
            ))
          }
        </div>

      </div>
    </div>
  );
};

Order.propTypes = {
  _id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  orderTime: PropTypes.string.isRequired,
  orderDetails: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
}


export default Order;