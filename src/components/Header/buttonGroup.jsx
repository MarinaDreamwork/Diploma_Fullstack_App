import Favorite from "../Main/favorite";
import AuthButton from "./authButton";
import CartButton from "./cartButton";
import OrderButton from "./orderButton";

const ButtonGroup = () => {
  return ( 
    <div className='d-flex'>
      <AuthButton
        hint='Имя пользователя'
        style={{fontSize: '1.5rem', color: 'white'}}
      />
      <CartButton
        hint='Корзина'
        style={{fontSize: '1.5rem', color: 'white'}}
      />
      <Favorite
        hint='Избранное'
        style={{fontSize: '1.5rem', color: 'white'}}
      />
      <OrderButton
        hint='Мои заказы'
        style={{fontSize: '1.5rem', color: 'white'}}
      />
    </div>
  );
}
 
export default ButtonGroup;