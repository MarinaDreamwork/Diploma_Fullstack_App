import httpService from './http.service';

const bookEndPoint = 'book/';

const bookService = {
  get: async () => {
    const { data } = await httpService.get(bookEndPoint);
    return data;
  },
  changeItem: async (payload) => {
    const { data } = await httpService.patch(bookEndPoint + payload._id, payload);
    return data;
  },
  deleteItem: async(itemId) => {
    const { data } = await httpService.delete(bookEndPoint + itemId);
    return data;
  },
  createItem: async(payload) => {
    const { data } = await httpService.post(bookEndPoint, payload);
    return data;
  }
};

export default bookService;