const express = require('express');
const authCheck = require('../middleware/auth.middleware');
const Quotes = require('../model/Quotes');
const errorUnAuthHandler = require('../utils/errors');
const router = express.Router({
  mergeParams: true
});

router.get('/', async (req, res) => {
  try {
    const list = await Quotes.find();
    res.json(list);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Поробуйте позже.'
    })
  }
});

router.patch('/:itemId', authCheck, async (req, res) => {
  try {
    const { itemId } = req.params;
    // if user is Admin
      if(req.user._id === '62deb2923d3f45ab558bbe5b') {
        const updatedQuote = await Quotes.findByIdAndUpdate(itemId, req.body, { new: true });
        console.log('updatedQuote', updatedQuote);
        res.send(updatedQuote);
      } else {
        errorUnAuthHandler(res);
      }
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Поробуйте позже.'
    })
  }
});
      

module.exports = router;