import { createAction, createSlice } from '@reduxjs/toolkit';
import quotesService from '../services/quotes.service';

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    data: null,
    isLoading: true,
    error: null
  },
  reducers: {
    quotesRequested: (state) => {
      state.isLoading = true;
    },
    quotesRequestedSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    quotesRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    quotesChangedItemDataRequestSuccess: (state, action) => {
      state.data[
        state.data.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    }
  }
});

const { reducer: quotesReducer, actions } = quotesSlice;
const {
  quotesRequested,
  quotesRequestedSuccess,
  quotesRequestedFailed,
  quotesChangedItemDataRequestSuccess
} = actions;

const quotesChangedItemDataRequest = createAction('quotes/changedItemDataRequest');
const quotesChangedItemDataRequestFailed = createAction('quotes/changedItemDataRequestFailed');

export const loadQuotesList = () => async (dispatch) => {
  dispatch(quotesRequested());
  try {
    const { content } = await quotesService.get();
    dispatch(quotesRequestedSuccess(content));
  } catch (error) {
    dispatch(quotesRequestedFailed(error.message));
  }
};

export const changeQuoteData = (payload) => async (dispatch) => {
  dispatch(quotesChangedItemDataRequest());
  try{
    const { content } = await quotesService.changeItem(payload);
    dispatch(quotesChangedItemDataRequestSuccess(content));
  } catch(error) {
    dispatch(quotesChangedItemDataRequestFailed(error.message))
  }
};

export const getQuoteById = (itemId) => (state) => state.quotes.data.filter(item => item._id === itemId);
export const getQuotes = () => (state) => state.quotes.data; 
export const getQuotesLoadingStatus = () => (state) => state.quotes.isLoading; 

export default quotesReducer;