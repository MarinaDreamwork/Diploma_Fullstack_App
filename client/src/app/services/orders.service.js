import httpService from './http.service';

const ordersEndPoint = 'order/';

const ordersService = {
  get: async () => {
    const { data } = await httpService.get(ordersEndPoint);
    console.log('data from service', data);
    return data;
  },
  create: async (payload) => {
    console.log('payload in create order', payload);
    const { data } = await httpService.post(ordersEndPoint, payload);
    return data;
  }
};

export default ordersService;