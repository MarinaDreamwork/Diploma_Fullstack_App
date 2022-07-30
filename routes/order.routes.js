const express = require('express');
const authCheck = require('../middleware/auth.middleware');
const errorServer = require('../utils/errors');
const errorUnAuthHandler  = require('../utils/errors');
const Order = require('../model/Order');
const router = express.Router({
  mergeParams: true
});

router
.route('/')
.get(authCheck, async (req, res) => {
  try {
    // проверка на admin
    const list = await Order.find();
    res.send(list);
  } catch (error) {
    errorServer(res);
  }
})
.post(authCheck, async (req, res) => {
    try {
      const newOrder = await Order.create({
        ...req.body
      });
      console.log('newOrder', newOrder);
      res.status(201).send(newOrder);
    } catch(error) {
      errorUnAuthHandler(res);
    }
  });

module.exports = router;