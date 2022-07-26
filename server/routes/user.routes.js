const express = require('express');
const User = require('../model/User');
const authCheck = require('../middleware/auth.middleware');
const errorUnAuthHandler = require('../utils/errors');
const errorServer = require('../utils/errors');
const router = express.Router({
  mergeParams: true
});

router.get('/:userId', authCheck, async (req, res) => {
  try {
    const { userId } = req.params;
      if(userId === req.user._id) {
        const list = await User.findById(userId);
        res.send(list);
      } else {
        errorUnAuthHandler();
      }
  } catch(error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка.'
    });
  }
});

router.patch('/:userId', authCheck, async (req, res) => {
  try {
   const { userId } = req.params;
   if(userId === req.user.id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      console.log('updatedUser', updatedUser);
      res.send(updatedUser);
     } else {
       errorUnAuthHandler(res);
     }
  } catch (error) {
    errorServer(res);
  }
});

router.post('/:userId', authCheck, async (req, res) => {
  try {
   const { userId } = req.params;
   if(userId === req.user._id) {
    console.log('req.body', req.body);
      const updatedUser = await User.findByIdAndUpdate(userId, { $push: req.body}, { new: true } );
      console.log('updatedUser', updatedUser);
      res.send(updatedUser);
     } else {
       errorUnAuthHandler(res);
     }
  } catch (error) {
    errorServer(res);
  }
});

module.exports = router;