import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
//import PaymentInfo from '../../ui/paymentInfo';
import Button from '../styles/button';
import PagesSectionWrapper from '../styles/pagesSectionWrapper';
import TextField from './textField';

const PaymentForm = () => {
  const [data, setData] = useState({
    cardholders_name: '',
    card_number: '',
    exp_date: '',
    sec_code: ''
  });

  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('data', data);
  };

  return (
    <PagesSectionWrapper>
      <div className='payment_card_wrapper'>
        <div className="payment_card_title">
          <h3 className='text-center p-3'>Your Payment Information</h3>
        </div>
        <div className='payment_card d-flex justify-content-center'>
          <div className='payment_card_view m-4'>
            <div className='d-flex align-items-center justify-content-between'>
              <i className='bi bi-piggy-bank-fill m-0 ms-2 mt-2' style={{ fontSize: '2rem', color: 'orange' }}></i>
              <i className='wifi bi bi-wifi m-0 me-4 ' style={{ fontSize: '2rem' }}></i>
            </div>
            <i className='bi bi-credit-card-2-front' style={{ fontSize: '2rem' }}></i>
            <div className='d-flex justify-content-center'>
              <p className='m-0 fs-4' style={{ letterSpacing: '0.2rem' }}>{data.card_number || '1111 2222 3333 4444'}</p>
            </div>
            <div className='d-flex justify-content-center'>
              <div className='d-flex flex-column'>
                <p className='m-0 text-center fw-bold' style={{ fontSize: '10px' }}>VALID</p>
                <p className='m-0 text-center fw-bold' style={{ fontSize: '10px' }}>THRU</p>
              </div>
              <p className='m-0 ps-1' style={{ color: 'white' }}>{data.exp_date || '12/28'}</p>
            </div>
            <p className='m-0 fw-bold ps-2' style={{ color: 'white', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>{data.cardholders_name || 'cardholder name'}</p>
          </div>
          <div className='payment_card_fields ps-4'>
            <form onSubmit={handleSubmit}>
              <TextField
                label={`Cardholder's name:`}
                type='text'
                name='cardholders_name'
                value={data.cardholders_name}
                onHandleChange={handleChange}
              />
              <TextField
                label='Card number:'
                type='text'
                name='card_number'
                value={data.card_number}
                onHandleChange={handleChange}
              />
              <div className='d-flex'>
                <TextField
                  label='Expiration (mm/yy)'
                  type='text'
                  name='exp_date'
                  value={data.exp_date}
                  onHandleChange={handleChange}
                />
                <TextField
                  label='Security code'
                  type='password'
                  name='sec_code'
                  value={data.sec_code}
                  onHandleChange={handleChange}
                />
              </div>
              <div className='d-flex justify-content-center'>
                <NavLink to='/payment_proccessing'>
                  <Button
                    color='outline-primary'
                    description='Оплатить покупку' />
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PagesSectionWrapper>
  );
};

export default PaymentForm;