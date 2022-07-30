const { Schema, model } = require('mongoose');
const schema = new Schema({
  author: {
    type : String, required: true
  },
  content: {
    type: String, required: true
  }
});

module.exports = model('Quotes', schema);