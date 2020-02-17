const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoffeeSchema = new mongoose.Schema({
  //  Create a reference to the user model
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  coffeeShopName: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  hours: {
    type: String,
    required: true
  }
});

module.exports = Coffee = mongoose.model('coffee', CoffeeSchema);
