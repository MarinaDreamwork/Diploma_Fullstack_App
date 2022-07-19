const express = require('express');
const Quotes = require('../model/Quotes');
const router = express.Router({
  mergeParams: true
});

router.get('/', async (req, res) => {
  try {
    const list = await Quotes.find();
    res.status(200).json({ list });
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Поробуйте позже.'
    })
  }
});

module.exports = router;