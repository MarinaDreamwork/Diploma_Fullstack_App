import React, { useEffect, useState } from 'react';
import Preloader from '../common/preloader';
import PagesSectionWrapper from '../common/styles/pagesSectionWrapper';
import PaymentCompleted from './paymentCompleted';
//import MyOrders from '../pages/myOrders';

const PaymentInfo = () => {
  const [data, setData] = useState('Производится оплата...');

  useEffect(() => {

    setTimeout(() => {
      setData('Ваш запрос обрабатывается...')
    }, 2000);

    setTimeout(() => {
      setData('Оплата произведена успешно!')
    }, 4000);

  }, [])
  return (
    <PagesSectionWrapper>
      <div className='container'>
        <div className='d-flex justify-content-center row'>
          {
            data === 'Оплата произведена успешно!'
              ? <PaymentCompleted />
              : <div className='text-center m-5'><Preloader /></div>
          }
          <div className='d-flex flex-column justify-content-center m-5'>
            <div className='text-center'>
              <h4 style={{ textShadow: '2px 1px 1px grey' }}>{data}</h4>
            </div>
          </div>
        </div>
      </div>
    </PagesSectionWrapper>
  );
};

export default PaymentInfo;