import { NavLink } from 'react-router-dom';
import { useBooks } from '../../hooks/useBooks';
import BooksImage from '../../images/books.png';
import Favorite from './favorite';

const ProductCard = ({ item }) => {
  // const { isFavorite, handleToggleFavorite } = useFavorite(); 
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
        <h5>{item.author} - {item.book_title}</h5>
        <p>id: {item.id}</p>
        <p>{item.price} руб.</p>
      </div>
      <Favorite
        style={{fontSize: '2rem', color: 'red', paddingTop: '15px'}}
        isFavorite={item.isFavorite}
        id={item.id}
      />
      <div
        className='col-4 d-flex justify-content-center align-items-center'>
        <NavLink
          to={`/${item.id}`}
          className='btn btn-dark card-style'>
            Открыть карточку
        </NavLink>
      </div>
    </div>
  );
}
 
export default ProductCard;