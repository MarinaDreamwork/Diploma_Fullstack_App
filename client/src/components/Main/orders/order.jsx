import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getDate } from '../../../app/utils/dates';
import { calculateOrderSumm } from '../../../app/utils/calculate';
import { getItemById } from '../../../app/store/books';
import { formateNumberToPrice } from '../../../app/utils/formateNumbers';
import FlexStyleWrapper from '../../common/styles/flexStyleWrapper';

const Order = ({
  orderTime,
  address,
  orderDetails,
  orderNumber
}) => {

  const orderDate = new Date(orderTime);
  const expiresDeliveryDate = new Date(orderTime).getTime() + (3600 * 24 * 3) * 1000;
  const isDelivered = expiresDeliveryDate <= new Date().getTime();

  return (
    <div className='border shadow rounded border-light w-50 mb-4 m-auto'>
      <FlexStyleWrapper position='between' style='bg-light p-3'>
        <div>
          <div>
            <p className='fw-bold fs-4'>Заказ от {getDate(orderDate)}</p>
          </div>
          <div>
            <span>номер заказа: <span className='fw-bold'>{orderNumber}</span></span>
          </div>
        </div>
        <div>
          <span className='fw-bold'>сумма заказа: {formateNumberToPrice(calculateOrderSumm(orderDetails))} ₽</span>
        </div>
      </FlexStyleWrapper>
      <FlexStyleWrapper position='between' style='m-3'>
        <div>
          <p>Доставка Почтой России по адресу: {address.zip} ул. {address.street} д. {address.appartment} </p>
        </div>
        <div>
          <span className={'badge bg-' + (isDelivered ? 'success' : 'warning')}>{isDelivered ? 'Доставлено' : 'Заказ в пути'}</span>
        </div>
        <FlexStyleWrapper position='center'>
          {
            orderDetails.map(detail => (<div key={detail._id}>
              <img src={useSelector(getItemById(detail.goodsId))[0].src} style={{ width: '60px', marginRight: '5px' }} />
            </div>
            ))
          }
        </FlexStyleWrapper >
      </FlexStyleWrapper >
    </div >
  );
};

Order.propTypes = {
  orderTime: PropTypes.number.isRequired,
  orderDetails: PropTypes.array.isRequired,
  address: PropTypes.object.isRequired,
  orderNumber: PropTypes.string.isRequired
}


export default Order;