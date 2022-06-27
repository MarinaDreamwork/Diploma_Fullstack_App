import { Switch, Route } from 'react-router-dom';
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Main from "./components/pages/main";
import Card from "./components/pages/card";
import { BookProvider } from "./hooks/useBooks";
import Login from "./components/pages/login";
import Categories from "./components/categories";
import { FavoriteProvider } from "./hooks/useFavorite";
import MyFavorites from "./components/pages/myFavorites";
import MyOrders from "./components/pages/myOrders";
import MyCart from "./components/pages/myCart";
import CreateOrderForm from './components/common/form/createOrderForm';

const App = () => {

   return (
    <div className='container-wrapper'>   
      <BookProvider> 
          <FavoriteProvider>
            <Header />
            <Switch>
              <Route path='/' exact component={Main}/>
              <Route path='/login/:type?' component={Login} />
              <Route path='/my_favorites' component={MyFavorites}/>
              <Route path='/my_orders' component={MyOrders} />
              <Route path='/my_cart' component={MyCart} />
              <Route path='/create_order' component={CreateOrderForm} />
              <Route path='/genres/:category' component={Categories} />
              <Route path='/:cardId' component={Card} />
            </Switch>
          </FavoriteProvider>
        <Footer />
      </BookProvider>
    </div>
   )
}

export default App;