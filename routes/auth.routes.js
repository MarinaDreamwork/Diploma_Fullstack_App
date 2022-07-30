const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const tokenService = require('../service/token.service');
const { check, validationResult } = require('express-validator');
const errorServer = require('../utils/errors');
const errorUnAuthHandler = require('../utils/errors');
const router = express.Router({
  mergeParams: true
});
// 1. get data from request
// 2. check if user already exists
// 3. hash pawword
// 4. create user
// 5. generate tokens

router.post('/signUp', [
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля - 8 символов').isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400
          }
        })
      }
      const { email, password } = req.body;
      const existUser = await User.findOne({ email });
      if(existUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_EXISTS',
            code: 400
          }
        });
      };
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        email: email,
        ...req.body,
        password: hashedPassword
      });

      const tokens = tokenService.generate({ _id: newUser._id});
      console.log('tokens', tokens);
      await tokenService.save(newUser._id, tokens.refreshToken);
      res.status(201).send({
        ...tokens,
        userId: newUser._id
      });
    } catch (error) {
      errorServer(res);
    };
}]);
// 1. validate data
// 2. find user
// 3. compare hashed password
// 4. generate token
// 5. return data
router.post('/signInWithPassword', [
  check('email', 'Email введен некорректно').normalizeEmail().isEmail(),
  check('password').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: 'INVALID_DATA',
          code: 400
        }
      })
    }
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if(!existUser) {
      return res.status(400).send({
        error: {
          message: 'EMAIL_NOT_FOUND',
          code: 400
        }
      })
    };

    const isPasswordEqual = await bcrypt.compare(password, existUser.password);
    if(!isPasswordEqual) {
      return res.status(400).send({
        error: {
          message: 'INVALID_PASSWORD',
          code: 400
        }
      })
    };

    const tokens = tokenService.generate({ _id: existUser._id});
    console.log('tokens', tokens);
    await tokenService.save(existUser._id, tokens.refreshToken);
    res.status(201).send({...tokens, userId: existUser._id});
}]);

router.post('/token', async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);
    if(isTokenInvalid(data, dbToken)) {
      errorUnAuthHandler(res);
    };
    const tokens = await tokenService.generate({ _id: data._id });
    await tokenService.save(data._id, tokens.refreshToken);
    res.status(201).send({...tokens, userId: data._id});
  } catch(error) {
    errorServer(res);
  }
});

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

module.exports = router;