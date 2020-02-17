//  This is where we do our mongo db connection
const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

// mongoose.connect(db)
const connectDB = async () => {
  //
  try {
    //  mongoose.connect returns a promise so using await
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log('MongoDB connected...');
  } catch (err) {
    //  error value has a message property on it
    console.log(err.message);
    //  Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
