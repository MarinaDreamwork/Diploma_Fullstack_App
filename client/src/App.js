import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Main from './components/pages/main';
import Card from './components/pages/card/card';
import Login from './components/pages/login';
import Categories from './components/pages/categories/categories';
import MyFavorites from './components/pages/myFavorites';
import MyOrders from './components/pages/myOrders';
import MyCart from './components/pages/myCart';
import CreateOrderForm from './components/common/form/createOrderForm';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './components/pages/logOut';
import User from './components/pages/user';
import BooksLoader from './components/HOC/booksLoader';
import Admin from './components/pages/admin/admin';
import PaymentForm from './components/common/form/paymentForm';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './app/store/users';
import PaymentInfo from './components/ui/paymentInfo';

const App = () => {
  const isAdmin = useSelector(getCurrentUser())?.isAdmin;
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
          <ProtectedRoute path='/my_payment' component={PaymentForm} />
          <ProtectedRoute path='/payment_proccessing' component={PaymentInfo}/>
          <ProtectedRoute path='/my_profile/:userId?/:edit?' component={User} />
          {
            isAdmin && <ProtectedRoute path='/admin/:essence?/:itemId?/:edit?' component={Admin} />
          }
          <Route path='/genres/:category?/:subCategory?/:subSubCategory?' component={Categories} />
          <Route path='/logout' component={LogOut}/>
          <Route path='/:cardId' component={Card} />
        </Switch>
      </BooksLoader>
      <Footer />
    </div>
  );
};

export default App;