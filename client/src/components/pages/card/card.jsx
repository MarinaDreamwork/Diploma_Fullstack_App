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

const Card = () => {
  const booksLoadingStatus = useSelector(getBooksLoadingStatus());
  const { cardId } = useParams();
  const dispatch = useDispatch();
  const item = useSelector(getItemById(cardId));
  const [data, setData] = useState({});
  const inCart = data?.inCart;
  // const isFavorite = item?.isFavorite;
  let disableNegative = false;

  const increment = () => {
    const newItem = {
      ...data,
      quantity: incrementItem(data.quantity)
    };
    setData(newItem);
    dispatch(updatedQuantity(newItem));
  };

  const decrement = () => {
    if (data.quantity < 1) {
      disableNegative = true;
    } else {
      const newItem = {
        ...data,
        quantity: decrementItem(data.quantity)
      };
      setData(newItem);
      dispatch(updatedQuantity(newItem));
    }
  };

  const handleAddContent = () => {
    const newData = {
      ...data,
      inCart: true,
      quantity: 1
    }
    setData(newData);
    dispatch(addItemsToCart(newData));
  };

  const handleCart = () => {
    // необходимо передать в этот момент то количество, что сидит в data ++
    dispatch(updatedQuantity(data));
  };

  useEffect(() => {
    setData(
      ...item,
      {
        inCart: false,
        quantity: 0
      });
  }, []);

  // useEffect(() => {
  //   dispatch(updatedQuantity(data?.quantity));
  // }, [data?.quantity]);

  if (booksLoadingStatus) {
    return <Preloader />
  }

  return (
    item &&
    item.map(i => <section key={i.id}>
      <div className='container card'>
        <BreadCrumps
          category={i.category}
          subCategory={i.subCategory}
          subSubCategory={i.subSubCategory}
        />
        <div className='card-wrapper m-2 d-flex flex-row align-items-center'>
          <div className='card-image-wrapper m-3'>
            <img className='card-image' src={i.src} alt='book cover' />
          </div>
          <div className='card-info m-4'>
            <h3 className='card_author_title p-3 fw-bold'>{i.author} - {i.book_title}</h3>
            <h4 className='d-flex justify-content-center m-2 fw-bold p-4' style={{ color: 'blue', textShadow: '1px 1px 1px' }}>{i.price} {' '} ₽</h4>
            <p className='card_description'>{i.description}</p>
          </div>
          <div className='col-3 m-2 d-flex flex-column'>
            <div className='d-flex align-self-center'>
              {(!inCart)
                ?
                <>
                  <button
                    className='btn btn-primary m-3'
                    onClick={() => handleAddContent(i.id)}
                  >
                    Добавить в корзину
                  </button>
                  <Favorite
                    style={{
                      fontSize: '2rem',
                      color: 'red',
                      paddingTop: '20px',
                      paddingLeft: '15px'
                    }}
                    isFavorite={item.isFavorite}
                    id={item.id}
                  />
                </>
                :
                <div className='d-flex align-items-center'>
                  <NavLink
                    to='/my_cart'
                    className='btn btn-success m-3'
                    onClick={handleCart}>
                    Товар в корзине!
                    <p className='m-0'>Перейти</p>
                  </NavLink>
                  <div className='d-flex'>
                    <p
                      role='button'
                      className='border p-3'
                      onClick={decrement}
                      disabled={disableNegative}>
                      -
                    </p>
                    <p
                      className='border p-3'>
                      {data.quantity}
                    </p>
                    <p role='button' className='border p-3' onClick={increment}>+</p>
                  </div>
                </div>
              }
            </div>
            {/* <p className=''>id товара - {cardId}</p> */}
          </div>
        </div>
      </div>
    </section>)
  );
}

export default Card;