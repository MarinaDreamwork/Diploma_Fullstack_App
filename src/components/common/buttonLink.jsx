import { NavLink } from 'react-router-dom';
import { useBooks } from '../../hooks/useBooks';


const ButtonLink = ({ individualClass, hint, to, isFavorite }) => {
  const { getItemsInCart } = useBooks();
  const countCartItems = getItemsInCart();

  const getClassName = () => {
    if(to === '/my_favorites') {
      return 'd-flex justify-content-center align-self-center m-0 bi bi-balloon-heart' + (isFavorite ? '-fill' : '');
    } else {
      return 'bi d-flex justify-content-center align-self-center m-0 '+ individualClass;
    }
  };
  return (
    <div className='m-2'>
      <NavLink
        to={to}
        className='d-flex flex-column position-relative'
        style={{color: 'white', textDecoration: 'none'}}>
      <i
        className={getClassName()}
        style={{fontSize: '1.5rem', color: 'white'}}
      >   
      </i>
      { countCartItems !== 0 && hint==='Корзина' && (
        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
        {countCartItems}
        <span className="visually-hidden">unread messages</span>
        </span>
      ) }
      <p className='align-self-center m-0'>{hint}</p>
      </NavLink>
    </div>
  );
};
 
export default ButtonLink;