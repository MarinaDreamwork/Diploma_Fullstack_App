const express = require('express');
const Books = require('../model/Books');
const router = express.Router({
  mergeParams: true
});

router.get('/', async (req, res) => {
  try {
    const list = await Books.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: 'Произошла ошибка. Попробуйте позже.'
    });
  }
});

module.exports = router;