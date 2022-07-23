const ID_TOKEN = 'jwt-token';
const REFRESH_TOKEN = 'jwt-refresh_token';
const EXPIRES_DATE_TOKEN = 'jwt-expires';
const USER_ID = 'user-local-id';
const FAVORITE_ITEMS = 'favorite-items';

export const setTokens = ({ refreshToken, idToken, localId, expiresIn = 3600 }) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(ID_TOKEN, idToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(EXPIRES_DATE_TOKEN, expiresDate);
  localStorage.setItem(USER_ID, localId);
};

export const setBookContent = (data) => {
  console.log('data from setBookContent', data);
  const favoriteItem = data.filter(element => element.isFavorite === true);
  console.log('favoriteItem from setBook...', favoriteItem);
  return localStorage.setItem(FAVORITE_ITEMS, JSON.stringify(favoriteItem));
};

// export const updateBookContent = (data) => {
//   const localFavoriteItems = JSON.parse(localStorage.getItem(FAVORITE_ITEMS));
//   //const newFavoriteItem = ;
//   return localStorage.setItem(FAVORITE_ITEMS, JSON.stringify(data));
// };

export const getBookContent = () => {
  return JSON.parse(localStorage.getItem(FAVORITE_ITEMS));
};

export const getAccessToken = () => {
  return localStorage.getItem(ID_TOKEN);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const getTokenExpiresDate = () => {
  return localStorage.getItem(EXPIRES_DATE_TOKEN);
};

export const getUserId = () => {
  return localStorage.getItem(USER_ID);
};

export const removeTokens = () => {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(EXPIRES_DATE_TOKEN);
  localStorage.removeItem(USER_ID);
};

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeTokens,
  setBookContent,
  getBookContent
};

export default localStorageService;