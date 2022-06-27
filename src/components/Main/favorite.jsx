import { NavLink } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";

const Favorite = ({ hint, isFavorite, style, id }) => {
  const { toggleFavorite } = useBooks();

  const handleClick = ({ target }) => {
    console.log('target', target);
    toggleFavorite(id);
    //onToggle(target);
  };
  const getFavoriteClass = () => {
    return 'd-flex justify-content-center align-self-center m-0 bi bi-balloon-heart' + (isFavorite ? '-fill' : '');
  };

  if(hint) {
    return (
      <div className='m-2'>
        <NavLink
          to='/my_favorites'
          className='d-flex flex-column'
          style={{color: 'white', textDecoration: 'none'}}
        >
          <i
            className={getFavoriteClass()}
            style={style}>
          </i>
          <p className='align-self-center m-0'>{hint}</p>
        </NavLink>
      </div>
    )
  };

  return ( 
    <div>
      <i
        className={getFavoriteClass()}
        style={style}
        onClick={(e) => handleClick(e)}>
      </i>
      <p>{hint}</p>
    </div>
  );
}
 
export default Favorite;