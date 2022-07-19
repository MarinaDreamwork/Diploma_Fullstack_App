const { Schema, model } = require('mongoose');
const schema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  address: [{ 
    street: String,
    appartment: String,
    zip: String
  }],
  orderList: [{
    orderTime: Number,
    address: [{ 
      street: String,
      appartment: String,
      zip: String
    }],
    orderDetails: [{
      goodsId: String,
      price: Number,
      quantity: Number,
      src: String,
      totalAmount: Number
    }]
  }]   
});

module.exports = model('User', schema);