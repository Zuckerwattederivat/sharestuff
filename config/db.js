/**
 * Database Config
 */

// variables
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// connect to db
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

// export db connection
module.exports = connectDB;