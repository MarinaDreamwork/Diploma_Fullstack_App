import { combineReducers, configureStore } from '@reduxjs/toolkit';
import booksReducer from './books';
import usersReducer from './users';
import quotesReducer from './quotes';
import cartReducer from './cart';
import ordersReducer from './orders';

const rootReducer = combineReducers({
  books: booksReducer,
  quotes: quotesReducer,
  users: usersReducer,
  cart: cartReducer,
  orders: ordersReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}