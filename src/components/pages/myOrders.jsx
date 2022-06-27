import { NavLink, Route, Switch } from "react-router-dom";
import BoughtGoods from "../Main/boughtGoods";
import Orders from "../Main/orders/orders";

const MyOrders = () => {
  return (
    <>
      <div className='d-flex justify-content-center m-3 p-2'>
        <NavLink
          to='/my_orders/orders'
          style={{ textDecoration: 'none'}}
        >
          <h2
            className='p-2'
            role='button'
            style={{color: 'black'}}
          >
            Заказы
          </h2>
        </NavLink>
        <NavLink
          to='/my_orders/my_bought_goods'
          style={{ textDecoration: 'none'}}
        >
          <h2
            className='p-2'
            role='button'
            style={{color: 'black'}}
          >
            Купленные товары
          </h2>
        </NavLink>
      </div>
      <div>
        <Switch>
          <Route
            path='/my_orders/orders'
            component={Orders}
          />
          <Route
            path='/my_orders/my_bought_goods'
            component={BoughtGoods}
          />
        </Switch>
      </div>
    </>
  );
}
 
export default MyOrders;