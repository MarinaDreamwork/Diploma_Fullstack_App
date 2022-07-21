import { createAction, createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users.service';
import authService from '../services/auth.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import history from '../utils/history';
import { useAuthError } from '../utils/useAuthError';

const initialState = localStorageService.getAccessToken()
  ? {
    isLoading: true,
    error: null,
    isLoggedIn: true,
    auth: { userId: localStorageService.getUserId()}
  } : {
    data: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
    auth: null
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
      state.error = null;
    },
    authRequestedSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true
    },
    authRequestedFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreateRequestedSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    userLoggedIn: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    userLoggedInFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userLoggedOut: (state) => {
      state.auth = null;
      state.isLoggedIn = false;
      state.isLoading = true;
      state.data = null;
    },
    userUpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    userOrderCreatedRequestSuccess: (state, action) => {
      state.currentUser = {...state.currentUser, ...action.payload};
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
  userCreateRequestedSuccess,
  userLoggedIn,
  userLoggedInFailed,
  userLoggedOut,
  userUpdateSuccess,
  userOrderCreatedRequestSuccess
} = actions;

const userCreateRequested = createAction('users/createRequested');
const userCreateRequestedFailed = createAction('users/createRequestedFailed');
const userUpdateRequested = createAction('users/updateRequested');
const userUpdateFailed = createAction('users/updateFailed');
const userOrderCreatedRequest = createAction('users/orderCreatedRequest');
const userOrderCreatedRequestFailed = createAction('users/orderCreatedRequestFailed');

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await usersService.get()
    dispatch(usersRequestedSuccess(content));
  } catch (error) {
    dispatch(usersRequestedFailed(error.message));
  }
};

const createNewUser = (data) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const { content } = await usersService.createUser(data);
    dispatch(userCreateRequestedSuccess(content));
    history.push('/');
  } catch (error) {
    dispatch(userCreateRequestedFailed(error.message));
  }
};

export const signUp = ({ email, password, name, sex, street, appartment, zip }) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register({ email, password });
    setTokens(data);
    dispatch(authRequestedSuccess({ userId: data.localId }));
    dispatch(createNewUser({ userId: data.localId, email, password, name, sex, address: { street, appartment, zip } }));
    dispatch(getUserData());
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
    dispatch(authRequestedSuccess({ userId: data.localId }));
    dispatch(getUserData())
    history.push('/');
    // dispatch(getUserData());
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

// export const addOrderDataInUser = ({ id: orders }) => async (dispatch) => {
//   try {
//     const { content } = await usersService.updateOrderData(orders);
//     console.log('content', content);
//     // тут нам нужно добавить id созданного заказа, и далее все заказы будут добавляться к уже созданному массиву
//     dispatch(userCreatedOrder(content))
//   } catch (error) {
//     dispatch(userCreatedOrderFailed(error))
//   }  
// }

export const getUserData = () => async (dispatch) => {
  if(localStorageService.getAccessToken()) {
    try {
      const { content } = await usersService.getCurrentUser();
      dispatch(userLoggedIn(content))
    } catch (error) {
      dispatch(userLoggedInFailed(error.message));
    }
  } else {
    // добавить ли action, чтобы isLoading = false?
  }
};

export const createOrder = ({
    appartment,
    id,
    orderDetails,
    orderTime,
    street,
    zip,
    src
  }) => async (dispatch) => {
  dispatch(userOrderCreatedRequest());
  try {
    {/* изменить данные на актуальные */}
    const orderData = {
      address: [{ street, appartment, zip }],
      id,
      orderDetails,
      orderTime,
      src
    };
    const { content } = await usersService.updateOrderData(orderData);
    console.log('orderlist content', content);
    dispatch(userOrderCreatedRequestSuccess(orderData));
  } catch (error) {
    dispatch(userOrderCreatedRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeTokens();
  dispatch(userLoggedOut());
  history.push('/');
};

// для изменения данных в EditUserPage
export const updateUserData = (data) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try { 
    const { content } = await usersService.update(data);
    console.log('content', content);
    dispatch(userUpdateSuccess(content));
  } catch(error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const getUsers = () => (state) => state.users.data; 
export const getIsLoading = () => (state) => state.users.isLoading; 
export const getAuthErrors = () => (state) => state.users.error;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUser = () => (state) => state.users.currentUser;
export const getOrdersData = () => (state) => state.users.currentUser?.orderList;
export const getCurrentUserOrdersData = () => (state) => state.users.currentUser.orderNumbers?.orderAddress;
// потом это будем массив из строк id
export const getAddressId = () => (state) => state.users.currentUser.addressIds;


export default usersReducer;