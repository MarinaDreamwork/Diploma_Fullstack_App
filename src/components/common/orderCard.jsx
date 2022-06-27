import { useBooks } from "../../hooks/useBooks";
import CloseButton from "../Header/modal/closeButton";

const OrderCard = ({ cartContentItem, number }) => {
  const { deleteCartItem } = useBooks();
  return ( 
    <>
    <p>Мой заказ:</p>
    <div className='d-flex border rounded p-3'>
      <div className='d-flex flex-column align-self-center m-2'>
        <p className='m-0 p-2'>{number+1}</p>
      </div>
      <div className='d-flex flex-column align-items-center m-2'>
        <p className='fw-bold fs-5'>{cartContentItem.author}</p>
        <p>{cartContentItem.book_title}</p>
      </div>
      <div className='d-flex flex-column align-items-center m-2'>
        <img src={cartContentItem.src} width='80'/>
      </div>
      <div className='d-flex align-items-center m-2'>
        <p className='m-0'>{cartContentItem.quantity * cartContentItem.price} ₽</p>
      </div>
      <div className='d-flex align-items-center m-2'>
        <CloseButton
          onDelete={() => deleteCartItem(cartContentItem.id)}
          style={{fill: 'black', fontSize: '20px'}}/>
      </div>
    </div>
    </>
  );
}
 
export default OrderCard;