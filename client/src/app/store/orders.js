// import { createSlice } from '@reduxjs/toolkit';
// import ordersService from '../services/orders.service';

// const ordersSlice = createSlice({
//   name: 'orders',
//   initialState: {
//     data: [],
//     isLoading: true,
//     error: null
//   },
//   reducers: {
//     ordersRequested: (state) => {
//       state.isLoading = true;
//     },
//     ordersRequestedSuccess: (state, action) => {
//       state.data = action.payload;
//       state.isLoading = false;
//     },
//     ordersRequestedFailed: (state, action) => {
//       state.error = action.payload;
//       state.isLoading = false;
//     },
//     orderCreateRequest: (state) => {
//       state.isLoading = true;
//     },
//     orderCreateRequestSuccess: (state, action) => {
//       state.data.push(action.payload);
//       state.isLoading = false;
//     },
//     orderCreateRequestFailed: (state, action) => {
//       state.error = action.payload;
//       state.isLoading = false;
//     }
//    }
// });

// const { reducer: ordersReducer, actions } = ordersSlice;
// const { 
//   ordersRequested,
//   ordersRequestedSuccess,
//   ordersRequestedFailed,
//   orderCreateRequest,
//   orderCreateRequestSuccess,
//   orderCreateRequestFailed,
//   orderDeleteCartItem
// } = actions;

// // export const loadOrdersList = () => async (dispatch) => {
// //   dispatch(ordersRequested());
// //   try {
// //     const { content } = await ordersService.get()
// //     console.log('data from orders', content);
// //     dispatch(ordersRequestedSuccess(content));
// //   } catch (error) {
// //     dispatch(ordersRequestedFailed(error.message));
// //   }
// // };

// // {id: '', addressId: '', orderDate: date, orderNumber: 'number', orderDetails: [{ goodsId: '', quantity: num, price: num, src: 'image_path'}]}
// export const createOrder = ({ appartment, id, orderDetails, orderTime, street, zip}) => async (dispatch) => {
//   dispatch(orderCreateRequest());
//   try {
//     {/* изменить данные на актуальные */}
//     const { content } = await ordersService.create({
//       address: [{ street, appartment, zip }],
//       id,
//       orderDetails,
//       orderTime
//     });
//     console.log('content', content);
//     dispatch(orderCreateRequestSuccess(content));
//   } catch (error) {
//     dispatch(orderCreateRequestFailed(error.message));
//   }
// };

// export const getOrderById = (orderId) => async (dispatch) => {
//   dispatch(orderDataRequest());
//   try {
//     const content = await ordersService.getOrderById(orderId);
//     dispatch(orderDataLoadedSuccess(content))
//   } catch(error) {
//     dispatch(orderDataLoadedFailed(error.message))
//   }
// }

// // export const addOrderCart = (data) => (dispatch) => {
// //   dispatch(orderAddedCartItem(data));
// // };

// // export const updatedQuantity = (changedItem) => (dispatch) => {
// //   dispatch(orderChangedCartItem(changedItem))
// // };

// export const deleteCartItem = (itemId) => (dispatch) => {
//   dispatch(orderDeleteCartItem(itemId));
// };

// export const getOrders = () => (state) => state.orders.data; 
// export const getIsLoading = () => (state) => state.orders.isLoading; 
// export const getCartQuantity = () => (state) => state.orders.cart?.quantity;

// export default ordersReducer;