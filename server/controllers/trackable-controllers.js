const asyncHandler = require("express-async-handler");
const trackableRepo = require("../repository/trackable-repo");

const trackable = asyncHandler(async (req, res) => {
  const name = req.query.name;
  const limit = req.query.limit;
  if (!name || !limit) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const persons = await trackableRepo(name, limit);
  res.status(200).json(persons);
});

module.exports = trackable;
