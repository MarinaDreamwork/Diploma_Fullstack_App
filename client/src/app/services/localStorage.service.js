const ID_TOKEN = 'jwt-token';
const REFRESH_TOKEN = 'jwt-refresh_token';
const EXPIRES_DATE_TOKEN = 'jwt-expires';
const USER_ID = 'user-local-id';

export const setTokens = ({ refreshToken, idToken, localId, expiresIn = 3600 }) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(ID_TOKEN, idToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(EXPIRES_DATE_TOKEN, expiresDate);
  localStorage.setItem(USER_ID, localId);
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
  removeTokens
};

export default localStorageService;