import { createSlice, createAction } from '@reduxjs/toolkit';
import addressService from '../services/address.service';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    data: null,
    isLoading: true,
    error: null
  },
  reducers: {
    addressCreatedRequestSuccess: (state, action) => {
      state.data.push(action.payload);
    },
    addressRequestedSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    addressRequestedFailed: (state, action) => {
      state.error = action.payload;
    }
  }
});

const { reducer: addressReducer, actions } = addressSlice;
const { addressCreatedRequestSuccess, addressRequestedSuccess, addressRequestedFailed } = actions;

const addressCreatedRequest = createAction('address/createdRequest');
const addressCreatedRequestFailed = createAction('address/createdRequestFailed');
const addressRequested = createAction('address/requested');

export const createNewAddress = ({ id, appartment, city, street, zip }) => 
async (dispatch) => {
  console.log('id', id);
  dispatch(addressCreatedRequest());
  try {
    const { content } = await addressService.createAddress({ id, appartment, city, street, zip });
    dispatch(addressCreatedRequestSuccess(content));
  } catch (error) {
    dispatch(addressCreatedRequestFailed(error.message));
  }
};

export const getAddressById = (id) => async (dispatch) => {
  console.log('id', id);
  dispatch(addressRequested());
  try {
    const { content } = await addressService.getById(id);
    dispatch(addressRequestedSuccess(content));
  } catch(error) {
    dispatch(addressRequestedFailed(error.message));
  }
};

export default addressReducer;

