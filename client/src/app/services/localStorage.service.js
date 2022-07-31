import { expiresDate } from '../utils/dates';

const ID_TOKEN = 'jwt-token';
const REFRESH_TOKEN = 'jwt-refresh_token';
const EXPIRES_DATE_TOKEN = 'jwt-expires';
const USER_ID = 'user-local-id';
const FAVORITE_ITEMS = 'favorite-items';

export const setTokens = ({ refreshToken, accessToken, userId, expiresIn = 3600 }) => {
  const expiresAuthDate = expiresDate(expiresIn);
  console.log();
  localStorage.setItem(ID_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(EXPIRES_DATE_TOKEN, expiresAuthDate);
  localStorage.setItem(USER_ID, userId);
};

export const setBookContent = (data) => {
  const favoriteItem = data.filter(element => element.isFavorite === true);
  return localStorage.setItem(FAVORITE_ITEMS, JSON.stringify(favoriteItem));
};

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