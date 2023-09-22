const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { JWT_COOKIE_EXPIRE } = process.env

const TokenSchema = new Schema({
  token: {
    type: String
  },
  expireAt: {
    type: Date,
    expires: JWT_COOKIE_EXPIRE
  }
});

module.exports = mongoose.model("Token", TokenSchema);