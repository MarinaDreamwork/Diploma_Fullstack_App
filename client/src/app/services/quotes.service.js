import httpService from './http.service';

const quotesEndPoint = 'quote/';

const quotesService = {
  get: async () => {
    const { data } = await httpService.get(quotesEndPoint);
    return data;
  },
  changeItem: async (payload) => {
    console.log('payload', payload);
    const { data } = await httpService.patch(quotesEndPoint + payload._id, payload);
    return data;
  }
};

export default quotesService;