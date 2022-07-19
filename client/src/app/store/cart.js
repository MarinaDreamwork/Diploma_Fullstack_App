import { createSlice } from '@reduxjs/toolkit';
import { check } from '../utils/check';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    content: []
  },
  reducers: {
    cartAddedItem: (state, action) => {
      // const result = state.content.length > 0
      // ? (state.content.map(item => item.id === action.payload.id 
      //   ? {...item, quantity: item.quantity + action.payload.quantity}
      //   : {...item}
      //   ))
      // : [{...action.payload}];
      // console.log('result', result);
      const newResult = check(state.content, action.payload);
      console.log('newResult', newResult);
      state.content = newResult;
    },
    cartQuantityChanged: (state, action) => {
      state.content[state.content.findIndex(i => i.id === action.payload.id)] = action.payload;
    },
    cartContentCleared: (state) => {
      state.content = [];
    },
    // удаление позиции товара
    orderDeleteCartItem: (state, action) => {
      state.content = state.content.filter(item => item.id === action.payload.id);
    }
  }
});

const { reducer: cartReducer, actions } = cartSlice;
const {
  cartAddedItem,
  cartQuantityChanged,
  cartContentCleared
} = actions;

export const addItemsToCart = (data) => (dispatch) => {
  dispatch(updatedQuantity(data));
  dispatch(cartAddedItem(data));
};

export const updatedQuantity = (changedItem) => (dispatch) => {
  console.log('changesItem', changedItem);
  dispatch(cartQuantityChanged(changedItem))
};

export const clearCartContent = () => (dispatch) => {
  dispatch(cartContentCleared());
};

export const getItemsInCart = () => (state) => state.cart.content.reduce((sum, item) =>  sum + item.quantity, 0);

export const getCalculateCartSumm = () => (state) => state.cart.content.reduce((sum, item) =>  sum + (item.price * item.quantity), 0);

export const getCartContent = () => (state) => state.cart.content;

export default cartReducer;

