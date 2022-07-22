import httpService from './http.service';
import localStorageService, { getUserId } from './localStorage.service';

const usersEndPoint = 'user/';

const usersService = {
  get: async() => {
    const { data } = await httpService.get(usersEndPoint);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(usersEndPoint + getUserId());
    return data;
  },
  createUser: async (payload) => {
    const { data } = await httpService.put(usersEndPoint + payload.userId, payload);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(usersEndPoint + localStorageService.getUserId(), payload);
    return data;
  },
  updateOrderData: async (payload) => {
    const { data } = await httpService.post(usersEndPoint + localStorageService.getUserId() + '/orderList/', payload);
    return data;
  }
};

export default usersService;