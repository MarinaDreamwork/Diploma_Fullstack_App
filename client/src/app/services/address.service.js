import httpService from './http.service';

const addressEndPoint = 'address/';

const addressService = {
  createAddress: async (payload) => {
    const { data } = await httpService.put(addressEndPoint + payload.id, payload);
    return data;
  },
  getById: async (payload) => {
    const { data } = await httpService.get(addressEndPoint + payload);
    return data;
  }
};

export default addressService;