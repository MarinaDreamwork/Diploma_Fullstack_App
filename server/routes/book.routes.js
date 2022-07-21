const express = require('express');
const Books = require('../model/Books');
const authCheck = require('../middleware/auth.middleware');
const { errorUnAuthHandler } = require('../utils/errors');
const router = express.Router({
  mergeParams: true
});

router
.route('/')
.get(async (req, res) => {
  try {
    const list = await Books.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: 'Произошла ошибка. Попробуйте позже.'
    });
  }
})
.put(authCheck, async (req, res) => {
    try {
      const newBook = await Books.create({
        ...req.body
      });
      res.status(201).send(newBook);
    } catch(error) {
      errorUnAuthHandler(res);
    }
  });

router
  .route('/:bookId')
  .patch(authCheck, async(req, res) => {
    try {
      const { bookId } = req.params;
      const updatedBook = await Books.findByIdAndUpdate(bookId, req.body, { new: true });
      res.send(updatedBook);
    } catch (error) {
      errorUnAuthHandler(res);
    } 
  })
  .delete(authCheck, async (req, res) => {
    try {
      const { bookId } = req.params;
      await Books.findByIdAndRemove(bookId);
      return res.send(null);
    } catch(error) {
      errorUnAuthHandler(res);
    }
  });

module.exports = router;