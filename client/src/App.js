import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Main from './components/pages/main';
import Card from './components/pages/card';
import Login from './components/pages/login';
import Categories from './components/pages/categories';
import MyFavorites from './components/pages/myFavorites';
import MyOrders from './components/pages/myOrders';
import MyCart from './components/pages/myCart';
import CreateOrderForm from './components/common/form/createOrderForm';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './components/pages/logOut';
import UserPage from './components/pages/userPage';
import BooksLoader from './components/HOC/booksLoader';
import Admin from './components/pages/admin';
import PaymentForm from './components/common/form/paymentForm';

const App = () => {
  return (
    <div className='container-wrapper'>  
      <BooksLoader> 
        <Header />
        <Switch>
          <Route path='/' exact component={Main}/>
          <Route path='/login/:type?' component={Login} />
          <ProtectedRoute path='/my_favorites' component={MyFavorites}/>
          <ProtectedRoute path='/my_orders' component={MyOrders} />
          <ProtectedRoute path='/my_cart' component={MyCart} />
          <ProtectedRoute path='/create_order' component={CreateOrderForm} />
          <ProtectedRoute path='/payment' component={PaymentForm} />
          <ProtectedRoute path='/my_profile/:userId' component={UserPage} />
          <ProtectedRoute path='/admin/:itemId?/:edit?' component={Admin} />
          <Route path='/genres/:category' component={Categories} />
          <Route path='/logout' component={LogOut}/>
          <Route path='/:cardId' component={Card} />
        </Switch>
      </BooksLoader>
      <Footer />
    </div>
  );
};

export default App;