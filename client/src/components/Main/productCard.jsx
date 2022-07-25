import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import BooksImage from '../../app/images/books.png';
import Favorite from './favorite';

const ProductCard = ({ id, author, book_title, price, isFavorite }) => {
  return (
    <div className='card-wrapper d-flex m-2 mb-3 w-100'>
      <div className='col-2 d-flex justify-content-center me-2'>
        <img
          src={BooksImage}
          alt='book'
          className='books-image card-style'
        />
      </div>
      <div className='product-card-info card-style col-5'>
        <h5>{author} - {book_title}</h5>
        <p>артикул: {id}</p>
        <p className='fw-bold'>{price} ₽</p>
      </div>
      <Favorite
        style={{ fontSize: '2rem', color: 'red', paddingTop: '15px' }}
        isFavorite={isFavorite}
        id={id}
      />
      <div
        className='col-4 d-flex justify-content-center align-items-center'>
        <NavLink
          to={`/${id}`}
          className='btn btn-dark card-style'>
          Открыть карточку
        </NavLink>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  book_title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

export default ProductCard;