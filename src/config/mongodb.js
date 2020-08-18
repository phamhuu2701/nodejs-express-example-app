const mongoose = require("mongoose");
const config = require("./index");
mongoose.plugin(require("mongoose-paginate-v2"));
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", true);
mongoose.set("useUnifiedTopology", true);
mongoose.Promise = Promise;

const connection = mongoose.createConnection(config.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection.on("connected", () => {
  console.log("MongoDB connected to " + config.MONGO_URL);
});

connection.on("error", function (err) {
  console.error("MongoDB event error: " + err);
});

module.exports = connection;
