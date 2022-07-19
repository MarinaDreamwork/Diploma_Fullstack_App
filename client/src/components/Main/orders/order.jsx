import React from 'react';
import PropTypes from 'prop-types';
//import { useSelector } from 'react-redux';
import { getDate } from '../../../app/utils/getDate';
import { calculateOrderSumm } from '../../../app/utils/calculateTotalSumm';

const Order = ({ id, orderTime, address, orderDetails }) => {
  const orderDate = new Date(orderTime);
  console.log('orderDetails', orderDetails);

  return (
    <div className='border shadow rounded border-light w-50 mb-4 m-auto'>
      <div className='d-flex bg-light justify-content-between p-3'>
        <div>
          <div>
            <p className='fw-bold fs-4'>Заказ от {getDate(orderDate)}</p>
          </div>
          <div>
            <span>order id {id}</span>
          </div>
        </div>
        <div>
          <span className='fw-bold'>сумма заказа: {calculateOrderSumm(orderDetails)} ₽</span>
        </div>
      </div>
      <div className='d-flex justify-content-between p-2'>
        <div>
          {
            address.map(i => <p key={i.id}>Доставка Почтой России по адресу: {i.zip} ул. {i.street} д. {i.appartment} </p>)
          }
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
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  orderTime: PropTypes.string.isRequired,
  orderDetails: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
}


export default Order;