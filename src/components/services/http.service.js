import axios from 'axios';
import configFile from '../../config.json';

axios.defaults.baseURL = configFile.apiEndPoint;

axios.interceptors.request.use(
  function(config) {
    if(configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) + '.json' : config.url + '.json');
    }
    return config;
  }, function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    if(configFile.isFirebase) {
      res.data = { content: transformData(res.data) };
    };
    return res;
  }
);

function transformData(data) {
  return data
    ? Object.keys(data).map(key=> ({
      ...data[key]
    })) : []
};

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
};

export default httpService;