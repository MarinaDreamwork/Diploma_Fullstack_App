import { NavLink } from 'react-router-dom';
import BooksImage from '../../images/books.png';
import Favorite from './favorite';

const ProductCard = ({ props }) => {
  console.log('props', props);
  return ( 
    <div className='card-wrapper d-flex m-2 mb-3 w-100'>
      <div className='col-2 d-flex justify-content-center me-2'>
        <img src={BooksImage} alt='book' className='books-image card-style' />
      </div>
      <div className='product-card-info card-style col-5'>
        <h5>{props.author} - {props.book_title}</h5>
        <p>id: {props.id}</p>
        <p>{props.price} руб.</p>
      </div>
      <Favorite />
      <div className='col-4 d-flex justify-content-center align-items-center'>
        <NavLink to={`/${props.id}`} className='btn btn-dark card-style'>Открыть карточку</NavLink>
      </div>
    </div>
  );
}
 
export default ProductCard;