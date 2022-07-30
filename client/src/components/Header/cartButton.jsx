import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartButton = ({ style, hint }) => {
  const cartContent = useSelector();

  const count = cartContent.length;
  return (
    <div className='m-2'>
      <NavLink
        to='/my_cart'
        className='d-flex flex-column'
        style={{ color: 'white', textDecoration: 'none' }}>
        <i
          className='bi bi-cart4 d-flex justify-content-center align-self-center m-0'
          style={style}
        >
        </i>
        {count !== 0 && (
          <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
            {count}
            <span className="visually-hidden">unread messages</span>
          </span>
        )}
        <p className='align-self-center m-0'>{hint}</p>
      </NavLink>
    </div>
  );
};

CartButton.propTypes = {
  style: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired
}

export default CartButton;