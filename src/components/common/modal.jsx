import PropTypes from 'prop-types';
import { useCartContent } from '../../hooks/useCartContent';
import Cart from '../cart';

const Modal = ({ onCloseModal }) => {
  const { deleteContent } = useCartContent();
  const deleteOrder = () => {
    deleteContent();
    onCloseModal();
  };
  return (
    <div className='modal-wrapper'>
      <div className='modal-main-content'>
        <div className='modal-header'>
          <h3 style={{color: 'black'}}>Корзина</h3>
          <span className='close-button' onClick={onCloseModal}>&times;</span>
        </div>
        <div className='modal-body'>
          <Cart />
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-secondary' onClick={deleteOrder}>Отменить покупку</button>
          <button type='button' className='btn btn-primary'>Продолжить покупку</button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired
}
 
export default Modal;