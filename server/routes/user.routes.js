const express = require('express');
const User = require('../model/User');
const authCheck = require('../middleware/auth.middleware');
const errorUnAuthHandler = require('../utils/errors');
const errorServer = require('../utils/errors');
const router = express.Router({
  mergeParams: true
});

router.get('/', authCheck, async (req, res) => {
  try{
    const list = await User.find();
    res.send(list);
  } catch(error) {
    errorServer(res);
  }
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
    errorServer(res);
  }
});

router.patch('/:userId', authCheck, async (req, res) => {
  try {
   const { userId } = req.params;
   console.log('req.user', req.user);
   console.log('userId', userId);
   if(userId === req.user._id || req.user._id === '62deb2923d3f45ab558bbe5b') {
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

router.delete('/:userId', authCheck, async (req, res) => {
  try{
    const { userId } = req.params;
     if(req.user._id === '62deb2923d3f45ab558bbe5b') {
      await User.findByIdAndDelete(userId);
      return res.send(null);
     } else {
      errorUnAuthHandler(res);
     }
  } catch (error) {
    errorServer(res);
  }
})

module.exports = router;