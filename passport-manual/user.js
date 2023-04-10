const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user1');

const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: String
});


module.exports = mongoose.model('userData', User, 'userData');