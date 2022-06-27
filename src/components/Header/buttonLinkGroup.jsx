import ButtonLink from "../common/buttonLink";

const ButtonLinkGroup = () => {
  const buttonsLinkData = [
    {id: 1, to: '/login', hint: 'Имя пользователя', class: 'bi-person-circle'},
    {id: 2, to: '/my_cart', hint: 'Корзина', class: 'bi-cart4'},
    {id: 3, to: '/my_favorites', hint: 'Избранное', class: '', isFavorite: false},
    {id: 4, to: '/my_orders', hint: 'Мои заказы', class: 'bi-box-seam'},
  ];
  return ( 
    <div className='d-flex'>
      { buttonsLinkData.map(button => <ButtonLink
        key={button.id}
        to={button.to}
        hint={button.hint}
        individualClass={button.class}
      /> )}
    </div>
  );
}
 
export default ButtonLinkGroup;