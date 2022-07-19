const { Schema, model } = require('mongoose');
const schema = new Schema({
  user: {
    type : Schema.Types.ObjectId, ref: 'User', required: true
  },
  refreshToken: {
    type: String, required: true
  }
});

module.exports = model('Token', schema);