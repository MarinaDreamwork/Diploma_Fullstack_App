import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Favorite from '../../Main/favorite';
import Preloader from '../../common/preloader';
import { getBooksLoadingStatus, getItemById } from '../../../app/store/books';
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart, updatedQuantity } from '../../../app/store/cart';
import { incrementItem } from '../../../app/utils/incrementItem';
import { decrementItem } from '../../../app/utils/decrementItem';
import BreadCrumps from '../../Main/breadCrumps';
import Button from '../../common/styles/button';
import { formateNumberToPrice } from '../../../app/utils/formateNumbers';
import { getIsLoggedIn } from '../../../app/store/users';

const Card = () => {
  const booksLoadingStatus = useSelector(getBooksLoadingStatus());
  const isLoggedIn = useSelector(getIsLoggedIn());
  const { cardId } = useParams();
  const dispatch = useDispatch();
  const item = useSelector(getItemById(cardId));
  console.log('item', item);
  const [data, setData] = useState({});
  console.log('data', data);
  // const isFavorite = item?.isFavorite;
  const [disabled, setDisabled] = useState(false);

  const increment = () => {
    const newItem = {
      ...data,
      quantity: incrementItem(data.quantity),
      inStock: item[0].inStock - incrementItem(data.quantity),
    };
    setData(newItem);
    dispatch(updatedQuantity(newItem));
  };

  const decrement = () => {
    const newItem = {
      ...data,
      quantity: decrementItem(data.quantity),
      inStock: item[0].inStock + decrementItem(data.quantity)
    };
    setData(newItem);
    dispatch(updatedQuantity(newItem));
  };

  const handleAddContent = () => {
    const newData = {
      ...data,
      quantity: 1,
      inStock: item[0].inStock - 1,
      inCart: true
    }
    setData(newData);
    dispatch(addItemsToCart(newData));
  };

  const handleCart = () => {
    // необходимо передать в этот момент то количество, что сидит в data ++
    dispatch(updatedQuantity(data));
  };

  useEffect(() => {
    setData(...item);
  }, []);

  useEffect(() => {
    if (data.inStock === 0 || data.inStock < 0) {
      setDisabled(true);
    }
  }, [data?.inStock])

  if (booksLoadingStatus) {
    return <Preloader color='danger' />
  }

  return (
    item.length > 0 &&
    <section>
      <div className='container card'>
        <BreadCrumps
          category={item[0]?.category}
          subCategory={item[0]?.subCategory}
          subSubCategory={item[0]?.subSubCategory}
        />
        <div className='card-wrapper m-2 d-flex flex-row align-items-center'>
          <div className='card-image-wrapper m-3'>
            <img className='card-image' src={item[0]?.src} alt='book cover' />
          </div>
          <div className='card-info m-4'>
            <h3 className='card_author_title p-3 fw-bold'>{item[0]?.author} - {item[0]?.book_title}</h3>
            <h4 className='d-flex justify-content-center m-2 fw-bold p-4' style={{ color: 'blue', textShadow: '1px 1px 1px' }}>{formateNumberToPrice(item[0]?.price)} {' '} ₽</h4>
            <p className='card_description'>{item[0]?.description}</p>
          </div>
          <div className='col-3 m-2 d-flex flex-column'>
            <div className='d-flex align-items-center justify-content-around m-3'>
              {(!data?.inCart)
                ?
                <>
                  <Button
                    style={{ height: '40px' }}
                    disabled={disabled}
                    color='primary'
                    description='Добавить в корзину'
                    onClick={() => handleAddContent(item[0]?._id)}
                  />
                  {isLoggedIn &&
                    <Favorite
                      style={{
                        fontSize: '2rem',
                        color: 'red',
                        paddingTop: '20px',
                        paddingLeft: '15px'
                      }}
                      isFavorite={item[0]?.isFavorite}
                      id={item[0]?._id}
                    />
                  }
                </>
                :
                <>
                  <div className='d-flex align-items-center'>
                    <NavLink
                      to='/my_cart'
                      className='btn btn-success m-3'
                      onClick={handleCart}>
                      Товар в корзине!<span style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>Перейти</span>
                    </NavLink>
                    <div className='d-flex'>
                      <Button
                        color='transparent'
                        description='-'
                        style={{ padding: '15px', border: '1px solid #dee2e6' }}
                        onClick={decrement} />
                      <p
                        className='border p-3 mb-0'>
                        {data.quantity}
                      </p>
                      <Button
                        color='transparent'
                        description='+'
                        style={{ padding: '15px', border: '1px solid #dee2e6' }}
                        onClick={increment}
                        disabled={disabled}
                      />
                    </div>
                  </div>
                </>
              }
            </div>
            {
              disabled
              && <div className='d-flex justify-content-center'><p className='fw-bold text-danger p-3'>Товар на складе закончился!</p></div>
            }
            <div className='d-flex justify-content-center'>
              <p className=''>артикул -<span className='fw-bold ps-2'>{item[0]?.articleNumber}</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Card;