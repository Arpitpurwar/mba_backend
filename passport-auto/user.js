const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


mongoose.connect('mongodb://localhost:27017/testing');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);