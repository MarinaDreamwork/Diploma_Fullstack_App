const jwt = require('jsonwebtoken');
const config = require('config');
const Token = require('../model/Token');

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('accessSecret'), {
      expiresIn: '1h'
    });
    const refreshToken = jwt.sign(payload, config.get('refreshSecret'));
    return { 
      accessToken, refreshToken, expiresIn: 300
    };
  }

  async save(userId, refreshToken) {
    const data = await Token.findOne({ user: userId });
    if(data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = await Token.create({ user: userId, refreshToken});
    console.log('token', token);
    return token;
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('refreshSecret'));
    } catch (error) {
      return null;
    }
  }

  async findToken (refreshToken) {
    console.log('refreshToken find in MongoDB', refreshToken);
    try {
      return await Token.findOne({ refreshToken });
    } catch(error) {
      return error;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get('accessSecret'));
    } catch (error) {
      return null;
    }
  };
};

module.exports = new TokenService();