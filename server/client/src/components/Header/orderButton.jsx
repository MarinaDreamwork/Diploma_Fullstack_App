import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const OrderButton = ({ style, hint }) => {
  return (
    <div className='m-2'>
      <NavLink
        to='my_orders'
        className='d-flex flex-column'
        style={{ color: 'white', textDecoration: 'none' }}>
        <i
          title='Ваши заказы'
          className='bi bi-box-seam d-flex justify-content-center align-self-center m-0'
          style={style}>
        </i>
        <p className='align-self-center m-0'>
          {hint}
        </p>
      </NavLink>
    </div>
  )
};

OrderButton.propTypes = {
  style: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired
}

export default OrderButton;