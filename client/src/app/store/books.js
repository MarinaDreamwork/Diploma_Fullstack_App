import { createSlice, createAction } from '@reduxjs/toolkit';
import bookService from '../services/book.service';
import { getBookContent, setBookContent } from '../services/localStorage.service';
import { checkFavoritesFromStorage } from '../utils/checkFavoritesFromStorage';

const categories = [
  {id: '1', name: 'Художественная литература'},
  {id: '2', name: 'Нехудожественная литература'},
  {id: '3', name: 'Книги для детей'},
  {id: '4', name: 'Учебная, методическая литература'},
  {id: '5', name: 'Иностранные языки'},
  {id: '6', name: 'Книги о религии'}
];

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    data: null,
    isLoading: true,
    error: null,
    valueQuery: '',
    lastFetchVisited: null,
    dataLoaded: false,
    categories: categories
  },
  reducers: {
    booksRequested: (state) => {
      state.isLoading = true;
    },
    booksRequestedSuccess: (state, action) => {
      state.data = action.payload;
      state.dataLoaded = true;
      state.lastFetchVisited = Date.now(); 
      state.isLoading = false;
    },
    booksRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    booksFavoritesToggled: (state, action) => {
      const newData = state.data.map(i => {
        if(i._id === action.payload) {
          if(!i.isFavorite) {
            return {...i, isFavorite: true};
          } else {
            return {...i, isFavorite: false};
          }
        }
        return {...i}
      });
      setBookContent(newData);
      state.data = newData;
    },
    booksChangedItemDataRequestSuccess: (state, action) => {
      if (state.data) {
        state.data[state.data.findIndex(u => u._id === action.payload._id)] = action.payload;
      }
    },
    booksDeletedItemRequestSuccess: (state, action) => {
      state.data = state.data.filter(b => b._id !== action.payload);
    },
    booksCreatedItemRequestSuccess: (state, action) => {
      state.data.push(action.payload);
    },
    booksRemoveFavorites: (state) => {
      state.data = state.data.map(item => ({
        ...item,
        isFavorite: false
      }));
    }
}});

const { reducer: booksReducer, actions } = booksSlice;
const {
  booksRequested,
  booksRequestedSuccess,
  booksRequestedFailed,
  booksFavoritesToggled,
  booksChangedItemDataRequestSuccess,
  booksDeletedItemRequestSuccess,
  booksCreatedItemRequestSuccess,
  booksRemoveFavorites
} = actions;

const booksChangedItemDataRequest = createAction('books/changedItemDataRequest');
const booksChangedItemDataRequestFailed = createAction('books/changedItemDataRequestfailed');
const booksDeletedItemRequest = createAction('books/deletedItemRequest');
const booksDeletedItemRequestFailed = createAction('books/deletedItemRequestFailed');
const booksCreatedItemRequest = createAction('books/createdItemRequest');
const booksCreatedItemRequestFailed = createAction('books/createdItemRequestFailed');

export const loadBooksList = () => async (dispatch, getState) => {
  const { lastFetchVisited } = getState().books;
  if(isOutdatedData(lastFetchVisited)) {
    dispatch(booksRequested());
    try {
      const { content } = await bookService.get();
      const newContent = content.map(contentItem => ({
        ...contentItem,
        isFavorite: false,
        quantity: 0
      }));
      if(getBookContent()?.length > 0) {
        dispatch(booksRequestedSuccess(checkFavoritesFromStorage(newContent, getBookContent())));  
      } else  {
        dispatch(booksRequestedSuccess(newContent));
      }
    } catch (error) {
      dispatch(booksRequestedFailed(error.message));
    }
  }
};

export const removeFavorites = () => (dispatch) => {

  if(!getBookContent()) {
    dispatch(booksRemoveFavorites());  
  }  
}


export const changeItemData = (payload) => async (dispatch) => {
  console.log('payload', payload);
  dispatch(booksChangedItemDataRequest());
  try{
    const { content } = await bookService.changeItem(payload);
    console.log('content', content);
    dispatch(booksChangedItemDataRequestSuccess(content));
  } catch(error) {
    dispatch(booksChangedItemDataRequestFailed(error.message))
  }
};

export const deleteItem = (itemId) => async (dispatch) => {
  dispatch(booksDeletedItemRequest());
  try{
    await bookService.deleteItem(itemId);
    dispatch(booksDeletedItemRequestSuccess(itemId));
  } catch(error) {
    dispatch(booksDeletedItemRequestFailed(error.message));
  }
};

export const createNewItem = (payload) => async (dispatch) => {
  dispatch(booksCreatedItemRequest());
  try {
    const { content } = await bookService.createItem(payload);
    dispatch(booksCreatedItemRequestSuccess(content));
  } catch (error) {
    dispatch(booksCreatedItemRequestFailed(error.message));
  }
};

export const toggleFavorites = (itemId) => (dispatch) => {
  console.log('itemId', itemId);
  dispatch(booksFavoritesToggled(itemId));
};

export const filterCategoryBook = (category) => (state) => {
  return state.books.data.filter(book => book.category === category);
};

export const filterSubCategoryBook = (subCategory) => (state) => {
  return state.books.data.filter(book => book.subCategory === subCategory);
};

export const filterSubSubCategoryBook = (subSubCategory) => (state) => {
  return state.books.data.filter(book => book.subSubCategory === subSubCategory);
};

export const summInStockQuantity = () => (state) => {
  return state?.books?.data?.reduce((sum, item) => sum + item.inStock, 0);
};

const isOutdatedData = (date) => {
  if(Date.now() - date > 10*60*1000) {
    return true;
  }
  return false;
};

export const getFavoritedItems = () => (state) => state.books.data?.filter(item => item.isFavorite);

export const getItemById = (itemId) => (state) => state.books.data.filter(i => i._id === itemId);
export const getBooks = () => (state) => state.books.data; 
export const getBooksLoadingStatus = () => (state) => state.books.isLoading;
export const getSearchQuery = () => (state) => state.books.valueQuery; 
export const getDataStatus = () => (state) => state.books.dataLoaded;
export const getAllCategories = () => (state) => state.books.categories;


export default booksReducer;