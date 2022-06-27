import httpService from './http.service';

const quotesEndPoint = 'quotes/';

const quotesService = {
  get: async () => {
    const { data } = await httpService.get(quotesEndPoint);
    console.log('data', data);
    return data;
  }
};

export default quotesService;