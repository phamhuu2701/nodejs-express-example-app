const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports.connect = async (dbUrl) => {
  try {
    if (!dbUrl) return new Error('No database info provided');

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(`Please make sure Mongodb is installed and running!`);
    throw error;
  }
};

module.exports.disconnect = (db) => {
  db.disconnect();
};
