import { createSlice } from '@reduxjs/toolkit';
import ordersService from '../services/orders.service';
import { formatOrders } from '../utils/formatOrders';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    data: [],
    isLoading: true,
    error: null
  },
  reducers: {
    ordersRequested: (state) => {
      state.isLoading = true;
    },
    ordersRequestedSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    ordersRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    orderCreateRequest: (state) => {
      state.isLoading = true;
    },
    orderCreateRequestSuccess: (state, action) => {
      state.data.push(action.payload);
      state.isLoading = false;
    },
    orderCreateRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
   }
});

const { reducer: ordersReducer, actions } = ordersSlice;
const { 
  ordersRequested,
  ordersRequestedSuccess,
  ordersRequestedFailed,
  orderCreateRequest,
  orderCreateRequestSuccess,
  orderCreateRequestFailed
} = actions;

export const loadOrdersList = () => async (dispatch) => {
  dispatch(ordersRequested());
  try {
    const { content } = await ordersService.get();
    dispatch(ordersRequestedSuccess(formatOrders(content)));
  } catch (error) {
    dispatch(ordersRequestedFailed(error.message));
  }
};

// {id: '', addressId: '', orderDate: date, orderNumber: 'number', orderDetails: [{ goodsId: '', quantity: num, price: num, src: 'image_path'}]}
          // "orderTime": 1658941532823,
          // "goodsId": "62e377b9438b9cf3a202ca57",
          // "price": 650,
          // "quantity": 2,
          // "totalAmount": 1300,
          // "_id": {
          //   "$oid": "62e1705f5bb611c085e2e149"
       
export const createOrder = (payload) => async (dispatch) => {
  dispatch(orderCreateRequest());
  try {
    {/* изменить данные на актуальные */}
    const { content } = await ordersService.create(payload);
    console.log('content', content);
    dispatch(orderCreateRequestSuccess(content));
  } catch (error) {
    dispatch(orderCreateRequestFailed(error.message));
  }
};

// export const getOrderById = (orderId) => async (dispatch) => {
//   dispatch(orderDataRequest());
//   try {
//     const content = await ordersService.getOrderById(orderId);
//     dispatch(orderDataLoadedSuccess(content))
//   } catch(error) {
//     dispatch(orderDataLoadedFailed(error.message))
//   }
// }

export const getTotalSalesAmount = () => (state) => state.orders.data.reduce((sum, item) => sum + item.totalAmount, 0);

export const getTotalSoldQuantity = () => (state) => state.orders.data.reduce((sum, item) => sum + item.quantity, 0);

export const getOrders = () => (state) => state.orders.data; 
export const getIsLoading = () => (state) => state.orders.isLoading; 

export default ordersReducer;