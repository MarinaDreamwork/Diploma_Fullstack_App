const express = require('express');
const Books = require('../model/Books');
const authCheck = require('../middleware/auth.middleware');
const  errorServer = require('../utils/errors');
const errorUnAuthHandler  = require('../utils/errors');
const router = express.Router({
  mergeParams: true
});

router
.route('/')
.get(async (req, res) => {
  try {
    const list = await Books.find();
    res.send(list);
  } catch (error) {
    errorServer(res);
  }
})
.post(authCheck, async (req, res) => {
    try {
      // if user is Admin
      if(req.user._id === '62deb2923d3f45ab558bbe5b') {
      const newBook = await Books.create({
        ...req.body
      });
      console.log('newBook', newBook);
      res.status(201).send(newBook);
    }
    } catch(error) {
      errorUnAuthHandler(res);
    }
  });

router
  .route('/:bookId')
  .patch(authCheck, async(req, res) => {
    console.log('req.user', req.user)
    try {
      const { bookId } = req.params;
      const updatedBook = await Books.findByIdAndUpdate(bookId, req.body, { new: true });
      console.log('updatedBook', updatedBook);
      res.send(updatedBook);
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.'
      });
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