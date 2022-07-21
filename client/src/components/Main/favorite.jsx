import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleFavorites } from '../../app/store/books';

const Favorite = ({ hint, isFavorite, style, id }) => {
  const dispatch = useDispatch();

  const handleClick = ({ target }) => {
    const favItemId = target.dataset.id
    dispatch(toggleFavorites(favItemId));
  };
  const getFavoriteClass = () => {
    return 'd-flex justify-content-center align-self-center m-0 bi bi-balloon-heart' + (isFavorite ? '-fill' : '');
  };

  if (hint) {
    return (
      <div className='m-2'>
        <NavLink
          to='/my_favorites'
          className='d-flex flex-column'
          style={{ color: 'white', textDecoration: 'none' }}
        >
          <i
            className={getFavoriteClass()}
            style={style}>
          </i>
          <p className='align-self-center m-0'>{hint}</p>
        </NavLink>
      </div>
    )
  }

  return (
    <div>
      <i
        data-id={id}
        className={getFavoriteClass()}
        style={style}
        onClick={(id) => handleClick(id)}>
      </i>
      <p>{hint}</p>
    </div>
  );
};
Favorite.propTypes = {
  hint: PropTypes.string,
  isFavorite: PropTypes.bool,
  style: PropTypes.object.isRequired,
  id: PropTypes.string
}

export default Favorite;