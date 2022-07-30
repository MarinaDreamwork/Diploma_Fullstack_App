import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { formatCardInterface, formatExpDateInterface } from '../../../app/utils/formateNumbers';
import { validatorConfig, validator } from '../../../app/utils/validator';
import Button from '../styles/button';
import FlexStyleWrapper from '../styles/flexStyleWrapper';
import SectionWrapper from '../styles/sectionWrapper';
import TextField from './textField';

const PaymentForm = () => {
  const [data, setData] = useState({
    name: '',
    card_number: '',
    exp_date: '',
    sec_code: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <SectionWrapper>
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
              <p className='m-0 fs-4' style={{ letterSpacing: '0.2rem' }}>{data.card_number}</p>
            </div>
            <div className='d-flex justify-content-center'>
              <div className='d-flex flex-column'>
                <p className='m-0 text-center fw-bold' style={{ fontSize: '10px' }}>VALID</p>
                <p className='m-0 text-center fw-bold' style={{ fontSize: '10px' }}>THRU</p>
              </div>
              <p className='m-0 ps-1' style={{ color: 'white' }}>{data.exp_date}</p>
            </div>
            <p className='m-0 fw-bold ps-2' style={{ color: 'white', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>{data.name}</p>
          </div>
          <div className='ps-4' style={{ width: '370px' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label={`Cardholder's name:`}
                name='name'
                value={data.name.toUpperCase()}
                onHandleChange={handleChange}
                error={errors.name}
              />
              <TextField
                label='Card number:'
                name='card_number'
                placeholder='Введите номер карты в формате **** **** **** ****'
                value={formatCardInterface(data.card_number)}
                onHandleChange={handleChange}
                error={errors.card_number}
              />
              <div className='d-flex'>
                <TextField
                  label='Expiration (mm/yy)'
                  name='exp_date'
                  placeholder='Введите mm/yy'
                  value={formatExpDateInterface(data.exp_date)}
                  onHandleChange={handleChange}
                  error={errors.exp_date}
                />
                <TextField
                  label='Security code'
                  type='password'
                  name='sec_code'
                  value={data.sec_code}
                  onHandleChange={handleChange}
                  error={errors.sec_code}
                />
              </div>
              <FlexStyleWrapper position='center' style='mt-2 mb-2'>
                <NavLink to='/payment_proccessing'>
                  <Button
                    color='outline-primary'
                    description='Оплатить покупку'
                  />
                </NavLink>
              </FlexStyleWrapper>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper >
  );
};

export default PaymentForm;