import React from 'react';
import PropTypes from 'prop-types';
//import { useSelector } from 'react-redux';
import { getDate } from '../../../app/utils/dates';
import { calculateOrderSumm } from '../../../app/utils/calculateTotalSumm';
import { expiresDate } from '../../../app/utils/dates';
import { useSelector } from 'react-redux';
import { getItemById } from '../../../app/store/books';

const Order = ({ orderTime, address, orderDetails, orderNumber }) => {
  console.log('orderDetails', orderDetails);
  const orderDate = new Date(orderTime);
  const expiresDeliveryDate = expiresDate(259200);
  const isDelivered = expiresDeliveryDate <= new Date().getTime();

  return (
    <div className='border shadow rounded border-light w-50 mb-4 m-auto'>
      <div className='d-flex bg-light justify-content-between p-3'>
        <div>
          <div>
            <p className='fw-bold fs-4'>Заказ от {getDate(orderDate)}</p>
          </div>
          <div>
            <span>номер заказа: <span className='fw-bold'>{orderNumber}</span></span>
          </div>
        </div>
        <div>
          <span className='fw-bold'>сумма заказа: {calculateOrderSumm(orderDetails)} ₽</span>
        </div>
      </div>
      <div className='d-flex justify-content-between p-2'>
        <div>
          <p>Доставка Почтой России по адресу: {address.zip} ул. {address.street} д. {address.appartment} </p>
        </div>
        <div>
          <span className={'badge bg-' + (isDelivered ? 'success' : 'warning')}>{isDelivered ? 'Доставлено' : 'Заказ в пути'}</span>
        </div>
        <div>
          {/* {
            orderDetails.map(detail => (<>
              <img src={detail.src} style={{ width: '60px', marginRight: '5px' }} />
            </>
            ))
          } */}
          {
            orderDetails.map(detail => (<>
              <img src={useSelector(getItemById(detail.goodsId))[0].src} style={{ width: '60px', marginRight: '5px' }} />
            </>
            ))
          }
        </div>

      </div>
    </div>
  );
};

Order.propTypes = {
  src: PropTypes.string.isRequired,
  orderTime: PropTypes.string.isRequired,
  orderDetails: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  orderNumber: PropTypes.string.isRequired
}


export default Order;