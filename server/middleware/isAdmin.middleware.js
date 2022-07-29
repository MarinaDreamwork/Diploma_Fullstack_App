const tokenService = require("../service/token.service");
const errorUnAuthHandler = require("../utils/errors");

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      return errorUnAuthHandler(res);
    };
    const data = tokenService.validateAccess(token);
    if(!data) {
      return errorUnAuthHandler(res);
    }
    req.user = data;
    next();
  } catch (error) {
    errorUnAuthHandler(res);
  }
};