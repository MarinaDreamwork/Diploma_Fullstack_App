import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFavoritedItems } from '../../app/store/books';
import Button from '../common/styles/button';
import { formateNumberToPrice } from '../../app/utils/formateNumbers';

const MyFavorites = () => {
  const favoriteItems = useSelector(getFavoritedItems());
  const history = useHistory();

  const backToMainPage = () => {
    history.push('/');
  };

  return (
    <section>
      <div className='d-flex flex-column rounded'>
        <h4
          className='favorite-title d-flex justify-content-center m-3 p-3'
          style={{ textShadow: 'rgb(195, 195, 195) 3px 0 20px' }}>
          Мои<span className='text-danger fw-bold ps-3 pe-3'>избранные </span> книги:
        </h4>
        <div className='d-flex justify-content-center'>
          <div className='container'>
            <div className='row'>
              {favoriteItems.length > 0
                ? favoriteItems.map(item => (
                  <div className='col-sm-4' key={item._id}>
                    <div className='card-body'>
                      <NavLink
                        to={`/${item._id}`}
                        className='d-flex flex-column bg-light flex-start p-3 m-3'
                        style={{
                          boxShadow: 'rgb(195, 195, 195) 3px 0 20px',
                          textDecoration: 'none',
                          color: 'black'
                        }}
                      >
                        <div className='d-flex justify-content-center'>
                          <img
                            alt='book-cover'
                            src={item.src}
                            style={{ height: '150px' }}
                          />
                        </div>
                        <p
                          className='d-flex justify-content-center fw-bold pt-3 mb-0'>
                          {formateNumberToPrice(item.price)} ₽
                        </p>
                        <p className='d-flex justify-content-center fw-bold pt-3 mb-0' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px' }}>{item.book_title}</p>
                      </NavLink>

                    </div>
                  </div>
                ))
                : <div className='d-flex'>
                  <h3 className='d-flex m-5 text-center'>Пока нет избранных товаров</h3>
                </div>
              }
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <Button
            color='outline-primary m-3'
            onClick={backToMainPage}
            description='Добавить'
          />
        </div>
        {/* d-flex justify-content-center m-3 */}
      </div>
    </section>
  );
};

export default MyFavorites;