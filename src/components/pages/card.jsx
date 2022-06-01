import { useParams } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";

const Card = () => {
  const { getItemById } = useBooks();
  const { cardId } = useParams();
  console.log('cardId', cardId);
  const item = getItemById(cardId);
  return ( 
    <div className='container card'>
      <div className='card-path w-100 m-2 p-2'>
        {item.category} {'>'} {item.subCategory} {'>'} {item.book_title}
      </div>
      <div className='card-wrapper m-2 d-flex flex-row'>
        <div className='card-image-wrapper m-3'>
          <img className='card-image' src={item.src} alt="book cover" />
        </div>
        <div className='card-info m-2'>
          <h3>{item.author} - {item.book_title}</h3>
          <p><input type='number'/><span>шт.</span></p>{/* здесь сделать инпут с номерами */}
          <p>{item.price} руб.</p>
        </div>
        <div className='col-3 m-2 d-flex flex-column'>
          <div className='align-self-center'>
            <button className='btn btn-primary'>Купить</button>
          </div>
          <p className=''>id товара - {cardId}</p>
        </div>
      </div>
    </div>
   );
}
 
export default Card;