import { useState, useEffect } from "react";
import { NavLink, useParams  } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";
import Favorite from "../Main/favorite";
import Preloader from '../../components/common/preloader'

const Card = () => {
  const {
    addCartContent,
    getItemById,
    loadingBooks,
    updatedQuantity 
  } = useBooks();
  const { cardId } = useParams();
  const item = getItemById(cardId);
  console.log('item', item);
  const [data, setData] = useState({});
  //const [count, setCount] = useState(0);
  //const [error, setError] = useState(null);
  //const history = useHistory();
  let disableNegative = false;

  const increment = () => {
    setData(prevState => ({
      ...prevState,
      quantity: prevState.quantity++
    }));
  };

  const decrement = () => {
    //setCount(prevState=>prevState-1);
    if(data.quantity < 1) {
      disableNegative = true;
    } else {
      setData(prevState => ({
        ...prevState,
        quantity: prevState.quantity-- 
      }));
    }
  }

  const handleAddContent = () => {
    setData((prevState) => ({
      ...prevState,
      inCart: true,
      quantity: prevState.quantity+1
    }));
    addCartContent(data);
  };

  const handleCart = () => {
    //updatedQuantity(data);
  };

  useEffect(() => {
    setData({...item});
  }, []);

  useEffect(() => {
    updatedQuantity(data);
  }, [data.quantity]);

  if(loadingBooks) {
    return <Preloader />
  };
   
  return ( 
    <div className='container card'>
      <div className='card-path w-100 m-2 p-2'>
        <NavLink to='/genres' className='path-text'>{item.category}</NavLink> {'>'} <a>{item.subCategory}</a>{'>'} {item.book_title}
      </div>
      <div className='card-wrapper m-2 d-flex flex-row'>
        <div className='card-image-wrapper m-3'>
          <img className='card-image' src={item.src} alt="book cover" />
        </div>
        <div className='card-info m-4'>
          <h3>{item.author} - {item.book_title}</h3>
          <h4 className='d-flex justify-content-center m-2'>{item.price} руб.</h4>
          <p>{data.quantity}</p>
          <p>Здесь пусть будет краткое описание</p>
        </div>
        <div className='col-3 m-2 d-flex flex-column'>
          <div className='d-flex align-self-center'>
            { (!data.inCart) ? 
                <>
                  <button
                    className='btn btn-primary m-3'
                    onClick={handleAddContent}
                  > 
                    Добавить в корзину
                  </button>
                  <Favorite
                    style={{fontSize: '2rem', color: 'red', paddingTop: '15px'}}
                    isFavorite={item.isFavorite}
                    id={item.id}/>
                  </> :
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
   );
}
 
export default Card;