import { createAction, createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users.service';
import authService from '../services/auth.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import history from '../utils/history';
import { useAuthError } from '../utils/useAuthError';

const initialState = localStorageService.getAccessToken()
  ? {
    data: null,
    isLoading: true,
    error: null,
    isLoggedIn: true,
    // auth: { userId: localStorageService.getUserId()},
    //currentUser: null
  } : {
    data: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
    // auth: null,
    currentUser: null
  }
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersRequestedSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    usersRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequested: (state) => {
      state.isLoading = true;
    },
    authRequestedSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    authRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userLoggedInFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.isLoading = true;
      state.currentUser = null;
    },
    userUpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    // userOrderCreatedRequestSuccess: (state, action) => {
    //   console.log('action payload', action.payload);
    //   state.currentUser.orderList = {...state.currentUser.orderList, [action.payload.id]: {  ...action.payload}};
    // },
    userOrderCreatedRequestSuccess: (state, action) => {
      state.currentUser.orderList.push(action.payload.orderList[action.payload.orderList.length-1]);
    },
    userRemoveRequestSuccess: (state, action) => {
      state.data = state.data.filter(item => item._id !== action.payload);
    } 
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const { 
  usersRequested,
  usersRequestedSuccess,
  usersRequestedFailed,
  authRequested,
  authRequestedSuccess,
  authRequestedFailed,
  userLoggedOut,
  userUpdateSuccess,
  userOrderCreatedRequestSuccess,
  userRemoveRequestSuccess
} = actions;

const userCreateRequested = createAction('users/createRequested');
const userCreateRequestedSuccess = createAction('users/createRequestedSuccess')
const userCreateRequestedFailed = createAction('users/createRequestedFailed');
const userUpdateRequested = createAction('users/updateRequested');
const userUpdateFailed = createAction('users/updateFailed');
const userOrderCreatedRequest = createAction('users/orderCreatedRequest');
const userOrderCreatedRequestFailed = createAction('users/orderCreatedRequestFailed');
const userRemoveRequest = createAction('user/removeRequest');
const userRemoveRequestFailed = createAction('user/removeRequestFailed');

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await usersService.get();
    dispatch(usersRequestedSuccess(content));
  } catch (error) {
    dispatch(usersRequestedFailed(error.message));
  }
};

const createNewUser = (data) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const { content } = await usersService.createUser(data);
    console.log('content', content);
    dispatch(userCreateRequestedSuccess(content));
    history.push('/');
  } catch (error) {
    dispatch(userCreateRequestedFailed(error.message));
  }
};

export const signUp = ({ email, street, appartment, zip, ...rest }) => async (dispatch) => {
  const userData = {
      email,
      address: { 
        street, 
        appartment, 
        zip 
      },
      ...rest 
    };
  dispatch(authRequested());
  try {
    const data = await authService.register(userData);
    setTokens(data);
    dispatch(authRequestedSuccess({ ...userData, isAdmin: email === 'marina@gmail.com'}));
    dispatch(createNewUser({ ...userData, userId: data.userId }));
  } catch (error) {
    dispatch(authRequestedFailed(error.message));
    // const { code, message } = error.response.data.error;
    // if(code === 400 && message === 'EMAIL_EXISTS') {
    //     const errorObject = {email: 'Пользователь с таким EMAIL уже существует'};
    //     throw errorObject;
    // }
  } 
};

export const logIn = ({ email, password }) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.logIn({ email, password });
    console.log('data', data);
    setTokens(data);
    //dispatch(authRequestedSuccess({ userId: data.localId }));
    dispatch(getUserData());
    history.push('/');
  } catch (error) {
    console.log('error', error);
    const { code, message } = error.response.data.error;
    if(code === 400) {
      const errorMessage = useAuthError(message);
      dispatch(authRequestedFailed(errorMessage));
    } else {
      dispatch(authRequestedFailed(error.message));
    }
  }
};

export const getUserData = () => async (dispatch) => {
  dispatch(authRequested());
  if(localStorageService.getAccessToken()) {
    try {
      const { content } = await usersService.getCurrentUser();
      dispatch(authRequestedSuccess({
        ...content, 
        isAdmin: content.email === 'marina@gmail.com'
      }));
    } catch (error) {
      dispatch(authRequestedFailed(error.message));
    }
  } else {
    // добавить ли action, чтобы isLoading = false?
  }
};

export const createOrder = ({
    appartment,
    orderDetails,
    orderTime,
    orderNumber,
    street,
    zip
  }) => async (dispatch) => {
  dispatch(userOrderCreatedRequest());
  try {
    {/* изменить данные на актуальные */}
    const orderData = { orderList: {
      address: { street, appartment, zip },
      orderDetails,
      orderTime,
      orderNumber
    }};
    const { content } = await usersService.updateOrderData(orderData);
    console.log('orderlist content', content);
    dispatch(userOrderCreatedRequestSuccess(content));
  } catch (error) {
    dispatch(userOrderCreatedRequestFailed(error.message));
  }
};

// const getUpdatedOrderData = () => async (dispatch) => {
//   dispatch(userUpdatedOrderRequest());
//   try {
//     const { content } = await usersService.getOrderData();
//     dispatch(userUpdatedOrderRequestSuccess(content));
//   } catch (error) {
//     dispatch(userUpdatedOrderRequestFailed(error.message));
//   }
// };

export const logOut = () => (dispatch) => {
  localStorageService.removeTokens();
  dispatch(userLoggedOut());
  history.push('/');
};

export const updateUserData = (data) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try { 
    const { content } = await usersService.update(data);
    dispatch(userUpdateSuccess(content));
  } catch(error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const removeUser = (id) => async (dispatch) => {
  dispatch(userRemoveRequest());
  try{
    await usersService.removeUser(id);
    dispatch(userRemoveRequestSuccess(id));
  } catch(error) {
    dispatch(userRemoveRequestFailed(error.message));
  }
};

export const getUsers = () => (state) => state.users.data; 
export const getIsLoading = () => (state) => state.users.isLoading; 
export const getAuthErrors = () => (state) => state.users.error;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUser = () => (state) => state.users.currentUser;
export const getOrdersData = () => (state) => state.users.currentUser?.orderList;
export const getOrderItems = () => (state) => state.users.currentUser?.orderList?.length;
export const getCurrentUserOrdersData = () => (state) => state.users.currentUser.orderNumbers?.orderAddress;
// потом это будем массив из строк id
export const getAddressId = () => (state) => state.users.currentUser.addressIds;


export default usersReducer;