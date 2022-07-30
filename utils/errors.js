function errorUnAuthHandler(res) {
  return res.status(401).json({message: 'Unauthorized'});
};

function errorServer(res) {
  return res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'});
};

module.exports = errorUnAuthHandler, errorServer;