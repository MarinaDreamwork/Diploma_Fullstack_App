const { Schema, model } = require('mongoose');
const schema = new Schema({
    orderTime: Number,
    userId: String,
    orderDetails: [{
      goodsId: String,
      price: Number,
      quantity: Number,
      totalAmount: Number
    }]  
});

module.exports = model('Order', schema);