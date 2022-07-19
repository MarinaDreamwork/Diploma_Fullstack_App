const { Schema, model } = require('mongoose');
const schema = new Schema({
  author: {
    type : String, required: true
  },
  book_title: {
    type: String, required: true
  },
  category: {
    type: String, required: true
  },
  categoryPath: {
    type: String, required: true
  },
  price: {
    type: Number, required: true
  },
  quantity: Number,
  src: {
    type: String, required: true
  },
  subCategory: {
    type: String, required: true
  },
  subSubCategory: {
    type: String, required: true
  }
});

module.exports = model('Books', schema);