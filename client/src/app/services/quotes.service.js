import httpService from './http.service';

const quotesEndPoint = 'quote/';

const quotesService = {
  get: async () => {
    const { data } = await httpService.get(quotesEndPoint);
    return data;
  }
};

export default quotesService;