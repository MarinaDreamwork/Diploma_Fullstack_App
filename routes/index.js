const express = require('express');
const router = express.Router({
  mergeParams: true
});

router.use('/auth', require('./auth.routes'));
router.use('/user', require('./user.routes'));
router.use('/book', require('./book.routes'));
router.use('/quote', require('./quote.routes'));
router.use('/order', require('./order.routes'));

module.exports = router;