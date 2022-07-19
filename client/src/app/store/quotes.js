import { createSlice } from '@reduxjs/toolkit';
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
    }
  }
});

const { reducer: quotesReducer, actions } = quotesSlice;
const { quotesRequested, quotesRequestedSuccess, quotesRequestedFailed } = actions;

export const loadQuotesList = () => async (dispatch) => {
  dispatch(quotesRequested());
  try {
    const { content } = await quotesService.get();
    dispatch(quotesRequestedSuccess(content));
  } catch (error) {
    dispatch(quotesRequestedFailed(error.message));
  }
};

export const getQuotes = () => (state) => state.quotes.data; 
export const getQuotesLoadingStatus = () => (state) => state.quotes.isLoading; 

export default quotesReducer;