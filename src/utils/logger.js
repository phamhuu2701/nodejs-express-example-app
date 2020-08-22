module.exports.logger = (value) => {
  if (process.env.ENV === "development") {
    console.log(value);
  }
};
