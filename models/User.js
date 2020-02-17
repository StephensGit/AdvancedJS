const mongoose = require('mongoose');

//  Creating the schema which is holds the different fields for the user
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    //  Will return the current date and time
    default: Date.now
  }
});

//  mongoose.model takes in the model name and the schema
module.exports = User = mongoose.model('user', UserSchema);
